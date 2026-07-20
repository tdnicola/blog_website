module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        sp: {
          bg: 'var(--bg)',
          surface: 'var(--surface)',
          border: 'var(--border)',
          ink: 'var(--ink)',
          body: 'var(--body)',
          muted: 'var(--muted)',
          'orange-text': 'var(--orange-text)',
          'orange-graphic': 'var(--orange-graphic)',
          divider: 'var(--divider)',
        },
      },
      typography: () => ({
        DEFAULT: {
          css: {
            color: 'var(--body)',
            maxWidth: 'none',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
