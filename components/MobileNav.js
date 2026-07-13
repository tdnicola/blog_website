import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <div className="sm:hidden">
      <button
        type="button"
        style={{
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: navShow ? 'var(--sp-accent)' : 'var(--sp-social)',
          padding: 0,
        }}
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          width={20}
          height={20}
        >
          {navShow ? (
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </button>

      <div
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: 0,
          right: 0,
          background: 'var(--sp-bg)',
          opacity: 0.97,
          zIndex: 200,
          transform: navShow ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <button
          type="button"
          aria-label="Close menu"
          style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            cursor: 'auto',
            background: 'none',
            border: 'none',
          }}
          onClick={onToggleNav}
        />
        <nav
          style={{ position: 'fixed', height: '100%', marginTop: 80 }}
          aria-label="Mobile navigation"
        >
          {headerNavLinks.map((link) => (
            <div key={link.title} style={{ padding: '14px 48px' }}>
              <Link
                href={link.href}
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: 20,
                  letterSpacing: '0.1em',
                  color: 'var(--sp-name)',
                  textDecoration: 'none',
                  display: 'block',
                }}
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
