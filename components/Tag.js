import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.1em',
          color: 'var(--sp-accent)',
          border: '1px solid var(--sp-border)',
          borderRadius: 3,
          padding: '2px 8px',
          textDecoration: 'none',
          textTransform: 'uppercase',
          display: 'inline-block',
          marginRight: 8,
          marginBottom: 4,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--sp-accent)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--sp-border)')}
      >
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
