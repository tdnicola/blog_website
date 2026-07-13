import Link from '@/components/Link'

export default function FourZeroFour() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: 80,
        paddingBottom: 80,
      }}
      className="md:flex-row md:items-center md:space-x-6 md:mt-24"
    >
      <div style={{ marginBottom: 32 }} className="md:mb-0">
        <h1
          style={{
            fontFamily: '"Orbitron", sans-serif',
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--sp-name)',
            textShadow: '0 0 40px var(--sp-glow)',
            borderRight: '2px solid var(--sp-border)',
            paddingRight: 24,
          }}
          className="md:px-6"
        >
          404
        </h1>
      </div>
      <div style={{ maxWidth: 400 }}>
        <p
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--sp-name)',
            marginBottom: 12,
            lineHeight: 1.4,
          }}
        >
          You snooping? How did you get here?
        </p>
        <p style={{ fontSize: 15, color: 'var(--sp-body)', marginBottom: 32, lineHeight: 1.6 }}>
          Keep your hands, arms, feet, and legs inside the ride at all times!
        </p>
        <Link href="/">
          <button
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 12,
              letterSpacing: '0.08em',
              color: 'var(--sp-bg)',
              background: 'var(--sp-accent)',
              border: 'none',
              borderRadius: 4,
              padding: '10px 20px',
              cursor: 'pointer',
            }}
          >
            RETURN TO BASE
          </button>
        </Link>
      </div>
    </div>
  )
}
