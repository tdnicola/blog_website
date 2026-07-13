import Image from 'next/image'
import Link from '@/components/Link'

const Card = ({ title, description, imgSrc, href }) => (
  <div className="p-4 md:w-1/2" style={{ maxWidth: '544px' }}>
    <div
      style={{
        height: '100%',
        border: '1px solid var(--sp-border)',
        borderRadius: 6,
        overflow: 'hidden',
        background: 'var(--sp-surface)',
      }}
    >
      {href ? (
        <Link href={href} aria-label={`Link to ${title}`}>
          <Image
            alt={title}
            src={imgSrc}
            className="lg:h-48 md:h-36 object-cover object-center"
            width={544}
            height={306}
          />
        </Link>
      ) : (
        <Image
          alt={title}
          src={imgSrc}
          className="lg:h-48 md:h-36 object-cover object-center"
          width={544}
          height={306}
        />
      )}
      <div className="p-6">
        <h2
          style={{
            fontFamily: '"Orbitron", sans-serif',
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: '0.05em',
            color: 'var(--sp-name)',
            marginBottom: 12,
          }}
        >
          {href ? (
            <Link
              href={href}
              aria-label={`Link to ${title}`}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--sp-body)', marginBottom: 12, lineHeight: 1.6 }}>
          {description}
        </p>
        {href && (
          <Link
            href={href}
            aria-label={`Link to ${title}`}
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 11,
              letterSpacing: '0.06em',
              color: 'var(--sp-accent)',
              textDecoration: 'none',
            }}
          >
            Learn more &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
