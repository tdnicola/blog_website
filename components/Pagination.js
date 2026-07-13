import Link from '@/components/Link'

export default function Pagination({ totalPages, currentPage }) {
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  const btnStyle = (active) => ({
    fontFamily: '"Space Mono", monospace',
    fontSize: 12,
    letterSpacing: '0.06em',
    color: active ? 'var(--sp-accent)' : 'var(--sp-body)',
    background: 'none',
    border: 'none',
    cursor: active ? 'pointer' : 'default',
    opacity: active ? 1 : 0.4,
    padding: '8px 0',
  })

  return (
    <div style={{ paddingTop: 24, paddingBottom: 32 }}>
      <nav
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        aria-label="Pagination"
      >
        {!prevPage ? (
          <button style={btnStyle(false)} disabled>
            &larr; Previous
          </button>
        ) : (
          <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
            <button style={btnStyle(true)}>&larr; Previous</button>
          </Link>
        )}

        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 11,
            color: 'var(--sp-social)',
            letterSpacing: '0.05em',
          }}
        >
          {currentPage} / {totalPages}
        </span>

        {!nextPage ? (
          <button style={btnStyle(false)} disabled>
            Next &rarr;
          </button>
        ) : (
          <Link href={`/blog/page/${currentPage + 1}`}>
            <button style={btnStyle(true)}>Next &rarr;</button>
          </Link>
        )}
      </nav>
    </div>
  )
}
