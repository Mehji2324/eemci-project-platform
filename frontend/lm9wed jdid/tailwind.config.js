/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: { 
      center: true, 
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem' }, 
      screens: { '2xl': '1440px' } 
    },
    extend: {
      colors: {
        primary: {
          50:  'hsl(var(--primary-50))',
          100: 'hsl(var(--primary-100))',
          200: 'hsl(var(--primary-200))',
          300: 'hsl(var(--primary-300))',
          400: 'hsl(var(--primary-400))',
          500: 'hsl(var(--primary-500))',
          600: 'hsl(var(--primary-600))',
          700: 'hsl(var(--primary-700))',
          800: 'hsl(var(--primary-800))',
          900: 'hsl(var(--primary-900))',
          950: 'hsl(var(--primary-950))',
        },
        brand: {
          200: 'hsl(var(--brand-200))',
          700: 'hsl(var(--brand-700))',
          800: 'hsl(var(--brand-800))',
          900: 'hsl(var(--brand-900))',
          950: 'hsl(var(--brand-950))',
        },
        accent: { 
          50:  'hsl(var(--accent-50))',
          100: 'hsl(var(--accent-100))',
          200: 'hsl(var(--accent-200))',
          300: 'hsl(var(--accent-300))',
          400: 'hsl(var(--accent-400))',
          500: 'hsl(var(--accent-500))',
          600: 'hsl(var(--accent-600))',
          700: 'hsl(var(--accent-700))',
          800: 'hsl(var(--accent-800))',
        },
        teal: { 
          500: '#0D9488', 
          600: '#0B7A70',
          700: '#085E56',
        },
        ink: { 
          DEFAULT: 'hsl(var(--ink))', 
          soft:    'hsl(var(--ink-soft))',
          muted:   'hsl(var(--ink-muted))',
        },
        surface: { 
          DEFAULT: 'hsl(var(--surface))', 
          muted:   'hsl(var(--surface-muted))', 
          subtle:  'hsl(var(--surface-subtle))',
          border:  'hsl(var(--surface-border))',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans:    ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      boxShadow: {
        'xs':           '0 1px 2px rgba(0,0,0,.04)',
        'soft':         '0 2px 8px -2px rgba(0,0,0,.05), 0 1px 2px -1px rgba(0,0,0,.02)',
        'md':           '0 4px 12px -2px rgba(0,0,0,.06), 0 2px 4px -2px rgba(0,0,0,.03)',
        'lg':           '0 12px 24px -4px rgba(0,0,0,.08), 0 4px 8px -4px rgba(0,0,0,.04)',
        'xl':           '0 20px 40px -8px rgba(0,0,0,.10), 0 8px 16px -8px rgba(0,0,0,.05)',
        'glow-primary': '0 0 0 1px hsla(var(--primary-500), 0.15), 0 8px 32px -8px hsla(var(--primary-500), 0.5)',
        'glow-accent':  '0 0 0 1px hsla(var(--accent-500), 0.20), 0 8px 32px -8px hsla(var(--accent-500), 0.5)',
        'glow-sm':      '0 4px 12px -2px hsla(var(--primary-500), 0.3)',
        'inner-white':  'inset 0 1px 0 rgba(255,255,255,0.15)',
        'inner-dark':   'inset 0 1px 0 rgba(0,0,0,0.05)',
      },
      borderRadius: { 
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'fade-up':   { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-down': { '0%': { opacity: '0', transform: 'translateY(-8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in':   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'scale-in':  { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        'shimmer':   { '100%': { transform: 'translateX(100%)' } },
        'float':     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        'pulse-ring':{ '0%': { transform: 'scale(1)', opacity: '1' }, '100%': { transform: 'scale(1.5)', opacity: '0' } },
      },
      animation: { 
        'fade-up':   'fade-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-down': 'fade-down 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in':   'fade-in 0.3s ease-out both',
        'scale-in':  'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'float':     'float 3s ease-in-out infinite',
        'shimmer':   'shimmer 2s infinite linear',
        'pulse-ring':'pulse-ring 1.5s cubic-bezier(0.215,0.61,0.355,1) infinite',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    }
  },
  plugins: []
};
