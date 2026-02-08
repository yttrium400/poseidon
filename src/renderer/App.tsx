import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/HomePage';
import { SettingsPage } from './components/SettingsPage';
import { RealmSearch } from './components/RealmSearch';
import { cn } from './lib/utils';

interface Tab {
    id: string;
    url: string;
    title: string;
    favicon: string;
    isLoading: boolean;
    canGoBack: boolean;
    canGoForward: boolean;
}

// Webview wrapper to handle event listeners and refs properly
interface WebviewControllerProps {
    tab: Tab;
    isActive: boolean;
    onUpdate: (tabId: string, data: Partial<Tab>) => void;
    onMount: (tabId: string, element: Electron.WebviewTag) => void;
    preloadPath: string; // Added preloadPath prop
}

const WebviewController = React.memo(({ tab, isActive, onUpdate, onMount, preloadPath }: WebviewControllerProps) => {
    const webviewRef = useRef<Electron.WebviewTag | null>(null);

    useEffect(() => {
        const element = webviewRef.current;
        if (!element) return;

        // Notify parent of mount
        onMount(tab.id, element);

        const checkNavigationState = () => {
            if (element) {
                onUpdate(tab.id, {
                    canGoBack: element.canGoBack(),
                    canGoForward: element.canGoForward()
                });
            }
        };

        const handleNavigate = (e: any) => {
            console.log('[Webview] did-navigate', e.url);
            onUpdate(tab.id, { url: e.url });
            checkNavigationState();
        };
        const handleNavigateInPage = (e: any) => {
            console.log('[Webview] did-navigate-in-page', e.url);
            onUpdate(tab.id, { url: e.url });
            checkNavigationState();
        };
        const handleTitleUpdated = (e: any) => onUpdate(tab.id, { title: e.title });
        const handleFaviconUpdated = (e: any) => {
            if (e.favicons && e.favicons.length > 0) {
                onUpdate(tab.id, { favicon: e.favicons[0] });
            }
        };
        const handleStartLoading = () => onUpdate(tab.id, { isLoading: true });
        const handleStopLoading = () => {
            onUpdate(tab.id, { isLoading: false });
            checkNavigationState();
        };

        // Add listeners
        element.addEventListener('did-navigate', handleNavigate);
        element.addEventListener('did-navigate-in-page', handleNavigateInPage);
        element.addEventListener('page-title-updated', handleTitleUpdated);
        element.addEventListener('page-favicon-updated', handleFaviconUpdated);
        element.addEventListener('did-start-loading', handleStartLoading);
        element.addEventListener('did-stop-loading', handleStopLoading);

        // cleanup
        return () => {
            element.removeEventListener('did-navigate', handleNavigate);
            element.removeEventListener('did-navigate-in-page', handleNavigateInPage);
            element.removeEventListener('page-title-updated', handleTitleUpdated);
            element.removeEventListener('page-favicon-updated', handleFaviconUpdated);
            element.removeEventListener('did-start-loading', handleStartLoading);
            element.removeEventListener('did-stop-loading', handleStopLoading);
        };
    }, [tab.id, onUpdate, onMount]);

    // Determine the URL for the webview. 'poseidon://newtab' should render 'about:blank'
    // Other 'poseidon://' URLs are handled by the App component's conditional rendering.
    const webviewSrc = tab.url.startsWith('poseidon://') && tab.url !== 'poseidon://newtab'
        ? 'about:blank' // Prevent webview from trying to load internal URLs other than newtab
        : tab.url === 'poseidon://newtab'
            ? 'about:blank'
            : tab.url;

    return (
        <div
            className={cn(
                "absolute inset-0 bg-white",
                isActive ? "z-10" : "z-0 pointer-events-none opacity-0"
            )}
        >
            <webview
                ref={webviewRef}
                src={webviewSrc}
                className="h-full w-full"
                webpreferences="contextIsolation=yes, nodeIntegration=no, sandbox=yes"
                partition="persist:poseidon" // Changed to persist:poseidon to match original
                preload={preloadPath} // Added preloadPath back
                // @ts-ignore
                allowpopups="true" // Added allowpopups back
            />
        </div>
    );
});

function App() {
    const [isSidebarPinned, setIsSidebarPinned] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('sidebar-pinned') === 'true';
        }
        return false;
    });
    const [isReady, setIsReady] = useState(false);
    const [tabs, setTabs] = useState<Tab[]>([]);
    const [activeTabId, setActiveTabId] = useState<string | null>(null);
    const [preloadPath, setPreloadPath] = useState<string>('');
    const [showRealmSearch, setShowRealmSearch] = useState(false);
    const webviewRefs = useRef<Map<string, Electron.WebviewTag>>(new Map());
    const pendingNavigation = useRef<{ tabId: string; url: string } | null>(null);

    // Persist sidebar pinned state
    useEffect(() => {
        localStorage.setItem('sidebar-pinned', isSidebarPinned.toString());
    }, [isSidebarPinned]);

    const activeTab = tabs.find(t => t.id === activeTabId);
    const isHomePage = activeTab?.url === 'poseidon://newtab';
    const isSettingsPage = activeTab?.url === 'poseidon://settings';
    const isInternalPage = activeTab?.url?.startsWith('poseidon://');

    // ... existing keyboard shortcut ...
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setShowRealmSearch(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.electron) {
            setIsReady(true);

            // Fetch ad blocker preload path
            window.electron.adBlock.getPreloadPath().then(path => {
                if (path) {
                    console.log('Ad blocker preload path:', path);
                    setPreloadPath(`file://${path}`);
                }
            });

            // Get initial tabs
            window.electron.tabs.getAll().then((initialTabs: any[]) => {
                setTabs(initialTabs.map(t => ({
                    ...t,
                    canGoBack: false,
                    canGoForward: false
                })));
            });

            // Get active tab
            window.electron.tabs.getActive().then((tab: any | null) => {
                if (tab) setActiveTabId(tab.id);
            });

            // Listen for tab updates
            const unsubscribeTabs = window.electron.tabs.onTabsUpdated((updatedTabs: any[]) => {
                setTabs(prev => {
                    // Create a map of existing states for O(1) lookup
                    const existingState = new Map(prev.map(t => [t.id, {
                        canGoBack: t.canGoBack,
                        canGoForward: t.canGoForward
                    }]));

                    return updatedTabs.map(t => {
                        const existing = existingState.get(t.id);
                        return {
                            ...t,
                            canGoBack: existing?.canGoBack ?? false,
                            canGoForward: existing?.canGoForward ?? false
                        };
                    });
                });
            });

            const unsubscribeActive = window.electron.tabs.onActiveTabChanged((tab: any | null) => {
                if (tab) setActiveTabId(tab.id);
            });

            const unsubscribeUpdate = window.electron.tabs.onTabUpdated((updatedTab: any) => {
                setTabs(prev => prev.map(t => {
                    if (t.id === updatedTab.id) {
                        return {
                            ...updatedTab,
                            // Preserve local state
                            canGoBack: t.canGoBack,
                            canGoForward: t.canGoForward
                        };
                    }
                    return t;
                }));
            });

            return () => {
                unsubscribeTabs();
                unsubscribeActive();
                unsubscribeUpdate();
            };
        }
    }, []);

    // Callback to update tab state
    const handleTabUpdate = useCallback((tabId: string, data: Partial<Tab>) => {
        // 1. Optimistic update
        setTabs(prev => prev.map(t =>
            t.id === tabId ? { ...t, ...data } : t
        ));
        // 2. Sync with main process
        window.electron.tabs.update(tabId, data);
    }, []);

    const handleWebviewMount = useCallback((tabId: string, element: Electron.WebviewTag) => {
        webviewRefs.current.set(tabId, element);
        // If there's a pending navigation for this tab, execute it now
        const pending = pendingNavigation.current;
        if (pending && pending.tabId === tabId) {
            pendingNavigation.current = null;
            element.src = pending.url;
        }
    }, []);

    // Navigate in active webview
    const handleNavigate = useCallback((url: string) => {
        if (!activeTabId) return;
        const webview = webviewRefs.current.get(activeTabId);
        if (webview && !url.startsWith('poseidon://')) {
            webview.src = url;
        }
        // Also notify main process
        window.electron?.navigation.navigate(url);
    }, [activeTabId]);

    // Navigation handlers
    const handleBack = useCallback(() => {
        if (activeTabId) {
            const webview = webviewRefs.current.get(activeTabId);
            if (webview && webview.canGoBack()) {
                webview.goBack();
            }
        }
    }, [activeTabId]);

    const handleForward = useCallback(() => {
        if (activeTabId) {
            const webview = webviewRefs.current.get(activeTabId);
            if (webview && webview.canGoForward()) {
                webview.goForward();
            }
        }
    }, [activeTabId]);

    const handleReload = useCallback(() => {
        if (activeTabId) {
            const webview = webviewRefs.current.get(activeTabId);
            if (webview) {
                if (webview.isLoading()) {
                    webview.stop();
                } else {
                    webview.reload();
                }
            }
        }
    }, [activeTabId]);

    // Listen for Cmd+R reload from main process menu
    useEffect(() => {
        if (window.electron?.navigation?.onReloadActiveTab) {
            const unsubscribe = window.electron.navigation.onReloadActiveTab(() => {
                handleReload();
            });
            return unsubscribe;
        }
    }, [handleReload]);

    // Listen for navigate-to-url from main process (triggered by TopBar URL bar)
    useEffect(() => {
        if (window.electron?.navigation?.onNavigateToUrl) {
            const unsubscribe = window.electron.navigation.onNavigateToUrl(({ tabId, url }) => {
                if (url.startsWith('poseidon://')) return;
                const webview = webviewRefs.current.get(tabId);
                if (webview) {
                    webview.src = url;
                } else {
                    // Webview doesn't exist yet (e.g., transitioning from home page)
                    // Queue navigation for when WebviewController mounts
                    pendingNavigation.current = { tabId, url };
                }
            });
            return unsubscribe;
        }
    }, []);

    return (
        <div className="h-screen w-full bg-surface overflow-hidden font-sans flex flex-col">
            {/* Top Navigation Bar */}
            <TopBar
                isSidebarPinned={isSidebarPinned}
                onBack={handleBack}
                onForward={handleForward}
                onReload={handleReload}
                canGoBack={activeTab?.canGoBack}
                canGoForward={activeTab?.canGoForward}
                isLoading={activeTab?.isLoading}
            />

            {/* Floating Sidebar - z-index ensures it's above webview */}
            <Sidebar
                isPinned={isSidebarPinned}
                onPinnedChange={setIsSidebarPinned}
                tabs={tabs}
                activeTabId={activeTabId}
            />

            {/* Main Content Area */}
            <main className={cn(
                "flex-1 relative transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                isSidebarPinned && "ml-[300px]" // 280px sidebar + 20px gap
            )}>

                {/* Loading state */}
                {!isReady ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-surface z-10">
                        <div className="flex flex-col items-center gap-4">
                            <div className="loading-spinner w-8 h-8" />
                            <p className="text-sm text-text-tertiary">Loading...</p>
                        </div>
                    </div>
                ) : (
                    /* Webviews and Internal Pages Container */
                    <div className="relative w-full h-full">
                        {/* Internal Pages */}
                        {isSettingsPage && <SettingsPage />}
                        {isHomePage && <HomePage />}
                        {isInternalPage && !isHomePage && !isSettingsPage && <HomePage />} {/* For other internal pages */}

                        {/* Browser Views */}
                        {tabs.map(tab => {
                            // Only render WebviewController for non-internal pages
                            // Internal pages (poseidon://) are handled by the conditional rendering above
                            const shouldRenderWebviewController = !tab.url.startsWith('poseidon://');

                            if (!shouldRenderWebviewController) return null;

                            return (
                                <WebviewController
                                    key={tab.id}
                                    tab={tab}
                                    isActive={activeTabId === tab.id}
                                    onUpdate={handleTabUpdate}
                                    onMount={handleWebviewMount}
                                    preloadPath={preloadPath}
                                />
                            );
                        })}
                    </div>
                )}
            </main>

            {/* Realm Search Modal */}
            <RealmSearch
                isOpen={showRealmSearch}
                onClose={() => setShowRealmSearch(false)}
            />
        </div>
    );
}

export default App;
