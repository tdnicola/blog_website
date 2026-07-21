import BackLink from '@/components/BackLink'

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
      <BackLink href="/">&larr; Back home</BackLink>
    </main>
  )
}
