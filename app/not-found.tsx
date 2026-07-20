import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      style={{
        maxWidth: 560,
        margin: '0 auto',
        padding: '120px 20px',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 28,
          fontWeight: 600,
          color: 'var(--ink)',
          marginBottom: 16,
        }}
      >
        404
      </h1>
      <p style={{ fontSize: 15, color: 'var(--body)', marginBottom: 32 }}>
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 12,
          letterSpacing: '0.1em',
          color: 'var(--orange-text)',
          textDecoration: 'underline',
          textUnderlineOffset: 3,
          textTransform: 'uppercase',
        }}
      >
        &larr; Back home
      </Link>
    </main>
  )
}
