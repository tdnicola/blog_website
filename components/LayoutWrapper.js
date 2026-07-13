import { useRouter } from 'next/router'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SpaceBackground from './SpaceBackground'

const LayoutWrapper = ({ children }) => {
  const router = useRouter()

  return (
    <SectionContainer>
      <SpaceBackground />
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 0',
            borderBottom: '1px solid var(--sp-border)',
            backdropFilter: 'blur(12px)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: 'var(--sp-header-bg)',
          }}
        >
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <span
              className="hidden sm:block"
              style={{
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: '0.08em',
                color: 'var(--sp-name)',
                textDecoration: 'none',
              }}
            >
              {typeof siteMetadata.headerTitle === 'string'
                ? siteMetadata.headerTitle.toUpperCase()
                : siteMetadata.headerTitle}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden sm:flex"
            style={{ gap: 32, alignItems: 'center' }}
            aria-label="Main navigation"
          >
            {headerNavLinks.map((link) => {
              const isActive = router.pathname === link.href
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: 12,
                    letterSpacing: '0.06em',
                    color: isActive ? 'var(--sp-accent)' : 'var(--sp-social)',
                    textDecoration: 'none',
                    padding: '12px 0',
                  }}
                >
                  {link.title.toUpperCase()}
                </Link>
              )
            })}
            <ThemeSwitch />
          </nav>

          {/* Mobile: theme toggle + hamburger */}
          <div className="sm:hidden" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>

        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
