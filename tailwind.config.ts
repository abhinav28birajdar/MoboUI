import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      colors: {
        accent: { DEFAULT: '#c026d3', hover: '#a21caf', subtle: '#4a044e' },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 1.5s ease-in-out infinite',
        'pulse-fuchsia': 'pulseFuchsia 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        pulseFuchsia: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
      },
      boxShadow: {
        fuchsia: '0 0 20px rgba(192, 38, 211, 0.35)',
        'fuchsia-sm': '0 0 8px rgba(192, 38, 211, 0.25)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
