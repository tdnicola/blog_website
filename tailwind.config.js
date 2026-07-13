const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.js', './components/**/*.js', './layouts/**/*.js', './lib/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
      },
      outline: {
        white: '3px solid white',
        black: '3px solid black',
      },
      rounded: {
        full: 'border-radius: 50%;',
      },
      borderRadius: {
        circle: '50%',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        space: ['"Space Mono"', 'monospace'],
        orbital: ['"Orbitron"', 'sans-serif'],
      },
      colors: {
        blue: colors.lightBlue,
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
        code: {
          green: '#b5f4a5',
          yellow: '#ffe484',
          purple: '#d9a9ff',
          red: '#ff8383',
          blue: '#93ddfd',
          white: '#fff',
        },
      },
      typography: () => ({
        DEFAULT: {
          css: {
            color: '#1e3a5f',
            a: {
              color: '#1d4ed8',
              '&:hover': { color: '#1e40af' },
              code: { color: '#1d4ed8' },
            },
            h1: { fontWeight: '700', color: '#0a1628', fontFamily: '"Orbitron", sans-serif' },
            h2: { fontWeight: '700', color: '#0a1628', fontFamily: '"Orbitron", sans-serif' },
            h3: { fontWeight: '600', color: '#0a1628' },
            'h4,h5,h6': { color: '#0a1628' },
            code: {
              color: '#1d4ed8',
              backgroundColor: 'rgba(29,78,216,0.08)',
              fontFamily: '"Space Mono", monospace',
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'code:before': { content: 'none' },
            'code:after': { content: 'none' },
            hr: { borderColor: 'rgba(30,58,138,0.15)' },
            'ol li:before': { fontWeight: '600', color: '#3b5998' },
            'ul li:before': { backgroundColor: '#3b5998' },
            strong: { color: '#0a1628' },
            blockquote: {
              color: '#1e3a5f',
              borderLeftColor: 'rgba(29,78,216,0.4)',
            },
          },
        },
        dark: {
          css: {
            color: '#6a8090',
            a: {
              color: '#93c5fd',
              '&:hover': { color: '#bae6fd' },
              code: { color: '#93c5fd' },
            },
            h1: { fontWeight: '700', color: '#dde8f5', fontFamily: '"Orbitron", sans-serif' },
            h2: { fontWeight: '700', color: '#dde8f5', fontFamily: '"Orbitron", sans-serif' },
            h3: { fontWeight: '600', color: '#dde8f5' },
            'h4,h5,h6': { color: '#dde8f5' },
            code: {
              color: '#93c5fd',
              backgroundColor: 'rgba(147,197,253,0.08)',
              fontFamily: '"Space Mono", monospace',
            },
            hr: { borderColor: 'rgba(147,197,253,0.28)' },
            'ol li:before': { fontWeight: '600', color: '#5a7890' },
            'ul li:before': { backgroundColor: '#5a7890' },
            strong: { color: '#dde8f5' },
            thead: { color: '#dde8f5' },
            tbody: { tr: { borderBottomColor: 'rgba(147,197,253,0.13)' } },
            blockquote: {
              color: '#dde8f5',
              borderLeftColor: 'rgba(147,197,253,0.65)',
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ['dark'],
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
