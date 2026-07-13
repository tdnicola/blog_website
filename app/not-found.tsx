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
          fontFamily: 'var(--font-orbitron), sans-serif',
          fontSize: 28,
          fontWeight: 700,
          color: 'var(--sp-name)',
          marginBottom: 16,
        }}
      >
        404
      </h1>
      <p style={{ fontSize: 15, color: 'var(--sp-body)', marginBottom: 32 }}>
        Lost in transmission. This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: 12,
          letterSpacing: '0.1em',
          color: 'var(--sp-accent)',
          textDecoration: 'none',
        }}
      >
        &larr; back home
      </Link>
    </main>
  )
}
