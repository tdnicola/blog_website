import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--sp-border)',
        padding: '32px 0',
        marginTop: 48,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', gap: 24 }}>
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="5" />
          <SocialIcon kind="github" href={siteMetadata.github} size="5" />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="5" />
        </div>
        <div
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.1em',
            color: 'var(--sp-social)',
          }}
        >
          {siteMetadata.author} &middot; &copy; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  )
}
