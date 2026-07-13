export default function PageTitle({ children }) {
  return (
    <h1
      style={{
        fontFamily: '"Orbitron", sans-serif',
        fontWeight: 700,
        fontSize: 'clamp(22px, 4vw, 36px)',
        letterSpacing: '-0.01em',
        color: 'var(--sp-name)',
        lineHeight: 1.2,
      }}
    >
      {children}
    </h1>
  )
}
