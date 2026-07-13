import Link from 'next/link'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

type SmartLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { children?: ReactNode }

// Single place that decides how a link should behave: an internal path uses
// next/link for client-side navigation, an in-page anchor or mailto link is
// left alone, and anything else is treated as external and opened safely.
export default function SmartLink({ href = '', children, ...props }: SmartLinkProps) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }

  if (href.startsWith('#') || href.startsWith('mailto:')) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}
