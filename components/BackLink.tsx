import Link from 'next/link'
import type { ReactNode } from 'react'

export default function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: 'var(--font-mono), monospace',
        fontSize: 11,
        letterSpacing: '0.1em',
        color: 'var(--orange-text)',
        textDecoration: 'underline',
        textUnderlineOffset: 3,
        textTransform: 'uppercase',
        display: 'inline-flex',
        alignItems: 'center',
        minHeight: 44,
      }}
    >
      {children}
    </Link>
  )
}
