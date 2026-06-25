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
          50:  '#EEF3FF',
          100: '#DCEAFF',
          200: '#B3C8FF',
          300: '#7B9CFF',
          400: '#3D64E0',
          500: '#1E3A8A',
          600: '#162D74',
          700: '#0F2060',
          800: '#09183F',
          900: '#050D22',
          950: '#020814',
        },
        accent: { 
          50:  '#FFF9E5',
          100: '#FFF0B3',
          200: '#FFE066',
          300: '#F5C842',
          400: '#E8AC1A',
          500: '#D4A017', 
          600: '#A87D11',
          700: '#7C5C0C',
          800: '#4F3A07',
        },
        teal: { 
          500: '#0D9488', 
          600: '#0B7A70',
          700: '#085E56',
        },
        ink: { 
          DEFAULT: '#0F172A', 
          soft:    '#475569',
          muted:   '#94A3B8',
        },
        surface: { 
          DEFAULT: '#FFFFFF', 
          muted:   '#F8FAFD', 
          subtle:  '#F1F5F9',
          border:  '#E2E8F0',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans:    ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      boxShadow: {
        'xs':           '0 1px 2px rgba(15,23,42,.04)',
        'soft':         '0 1px 3px rgba(15,23,42,.05), 0 8px 24px rgba(15,23,42,.07)',
        'md':           '0 4px 6px -1px rgba(15,23,42,.07), 0 12px 32px -4px rgba(15,23,42,.10)',
        'lg':           '0 10px 15px -3px rgba(15,23,42,.08), 0 20px 48px -8px rgba(15,23,42,.12)',
        'glow-primary': '0 0 0 1px rgba(30,58,138,.15), 0 8px 32px -8px rgba(30,58,138,.50)',
        'glow-accent':  '0 0 0 1px rgba(212,160,23,.20), 0 8px 32px -8px rgba(212,160,23,.50)',
        'glow-sm':      '0 4px 12px -2px rgba(30,58,138,.30)',
        'inner-white':  'inset 0 1px 0 rgba(255,255,255,.1)',
      },
      borderRadius: { 
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'fade-up':   { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in':   { '0%': { opacity: '0' },                               '100%': { opacity: '1' } },
        'shimmer':   { '100%': { transform: 'translateX(100%)' } },
        'float':     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        'spin-slow': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
        'marquee':   { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'pulse-ring':{ '0%': { transform: 'scale(1)', opacity: '1' }, '100%': { transform: 'scale(1.5)', opacity: '0' } },
        'count-up':  { '0%': { opacity: '0', transform: 'translateY(4px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: { 
        'fade-up':   'fade-up .5s ease-out both',
        'fade-in':   'fade-in .4s ease-out both',
        'float':     'float 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'marquee':   'marquee 30s linear infinite',
        'pulse-ring':'pulse-ring 1.5s cubic-bezier(0.215,0.61,0.355,1) infinite',
        'count-up':  'count-up .3s ease-out both',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34,1.56,0.64,1)',
        'ease-out-back': 'cubic-bezier(0.34,1.56,0.64,1)',
      },
    }
  },
  plugins: []
};
