const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          ...defaultTheme.fontFamily.sans,
        ],
        space: ['"Space Mono"', 'monospace'],
        orbital: ['"Orbitron"', 'sans-serif'],
      },
      colors: {
        sp: {
          bg: 'var(--sp-bg)',
          surface: 'var(--sp-surface)',
          border: 'var(--sp-border)',
          name: 'var(--sp-name)',
          body: 'var(--sp-body)',
          accent: 'var(--sp-accent)',
          'accent-dim': 'var(--sp-accent-dim)',
          social: 'var(--sp-social)',
        },
      },
      typography: () => ({
        DEFAULT: {
          css: {
            color: 'var(--sp-body)',
            maxWidth: 'none',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
