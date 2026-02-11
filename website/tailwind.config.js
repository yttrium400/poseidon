/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        display: ['Geist', 'Inter', 'SF Pro Display', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: '#0A0A0B',
          secondary: '#111113',
          tertiary: '#1A1A1D',
          elevated: '#222225',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          subtle: 'rgba(255,255,255,0.04)',
          strong: 'rgba(255,255,255,0.12)',
        },
        text: {
          primary: '#FAFAFA',
          secondary: '#A1A1AA',
          tertiary: '#71717A',
          inverted: '#0A0A0B',
        },
        brand: {
          DEFAULT: '#6366F1',
          light: '#818CF8',
          dark: '#4F46E5',
          muted: 'rgba(99,102,241,0.12)',
        },
        accent: {
          blue: '#3B82F6',
          violet: '#8B5CF6',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#EF4444',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0,0,0,0.3), 0 4px 16px -4px rgba(0,0,0,0.2)',
        'medium': '0 4px 12px -2px rgba(0,0,0,0.4), 0 8px 24px -4px rgba(0,0,0,0.3)',
        'glow': '0 0 20px -4px rgba(99,102,241,0.4)',
        'glow-lg': '0 0 40px -8px rgba(99,102,241,0.5)',
        'glow-brand': '0 0 20px rgba(99,102,241,0.4)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.4s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99,102,241,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(99,102,241,0.6)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
