import React from 'react';
import { cn } from '../lib/utils';
import { CommandBar } from './CommandBar';
import { Sparkles } from 'lucide-react';

interface HomePageProps {
    className?: string;
}

export function HomePage({ className }: HomePageProps) {
    const handleSearch = (instruction: string) => {
        const input = instruction.trim();
        if (!input) return;

        // Navigate for all inputs - main process handles URL normalization
        // and search engine selection for non-URL queries
        window.electron?.navigation.navigate(input);
    };

    return (
        <div className={cn(
            "flex flex-col items-center justify-center h-full w-full bg-gradient-to-b from-surface to-surface-secondary/30",
            "animate-in fade-in duration-500",
            className
        )}>
            <div className="w-full max-w-2xl px-6 flex flex-col items-center gap-10 -mt-16">
                {/* Brand / Greeting */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand to-accent-violet rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                        <div className="relative h-20 w-20 rounded-3xl bg-gradient-to-br from-brand to-accent-violet flex items-center justify-center shadow-xl shadow-brand/20">
                            <Sparkles className="h-10 w-10 text-white" />
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-4xl font-light text-text-primary tracking-tight">
                            What would you like to do?
                        </h1>
                        <p className="mt-2 text-text-tertiary">
                            Search the web, or let AI browse for you.
                        </p>
                    </div>
                </div>

                {/* Command Bar (existing component) */}
                <CommandBar
                    onRun={handleSearch}
                    isRunning={false}
                    status={'idle'}
                />
            </div>
        </div>
    );
}
