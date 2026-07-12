import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx,mdx}',
    './src/lib/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3', // fuchsia-600
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        background: '#0f0f14',
        card: '#1a1a24',
        border: '#2a2a38',
        fuchsia: {
          600: '#c026d3',
        },
        slate: {
          400: '#94a3b8',
          500: '#64748b',
        }
      },
      fontFamily: {
        sans: ['var(--font-body)', 'sans-serif'],
        heading: ['var(--font-heading)', 'sans-serif'],
        mono: ['var(--font-code)', 'monospace'],
      },
      backgroundImage: {
        'brand-glow': 'radial-gradient(circle, rgba(192,38,211,0.15) 0%, rgba(15,15,20,0) 70%)',
        'brand-gradient': 'linear-gradient(135deg, #c026d3 0%, #86198f 100%)',
        'card-shine': 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.02) 25%, transparent 30%)',
      },
      boxShadow: {
        'brand': '0 4px 14px 0 rgba(112, 26, 117, 0.2)',
        'brand-lg': '0 10px 25px -3px rgba(112, 26, 117, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-brand': 'pulse-brand 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-brand': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}

export default config
