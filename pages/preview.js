// Preview page — leerob.com-style minimalist layout
// Visit at /preview. Does not affect the rest of the site.

import Head from 'next/head'

function Preview() {
  return (
    <>
      <Head>
        <style>{`
        #preview-root a { color: #111 !important; text-decoration: underline; text-underline-offset: 3px; }
        #preview-root a:hover { color: #555 !important; }
        #preview-root .social-link { color: #666 !important; text-decoration: none !important; }
        #preview-root .social-link:hover { color: #111 !important; }
        #preview-root .post-link { color: #111 !important; text-decoration: none !important; }
        #preview-root .post-link:hover { text-decoration: underline !important; }
      `}</style>
      </Head>
      <div
        id="preview-root"
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          background: '#fff',
          color: '#111',
          minHeight: '100vh',
        }}
      >
        <main
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            padding: '60px 24px 80px',
          }}
        >
          {/* Name */}
          <h1
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#111',
              marginBottom: '24px',
              letterSpacing: '-0.3px',
            }}
          >
            Tony Nicola
          </h1>

          {/* Bio */}
          <p
            style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#333',
              marginBottom: '16px',
            }}
          >
            Data engineer at{' '}
            <a href="https://www.palomar.com" style={linkStyle}>
              Palomar
            </a>
            , where I build pipelines that move data cleanly from point A to point B — ideally
            without catching fire. I work with SQL, Python, Airflow, Snowflake, and DBT.
          </p>

          <p
            style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#333',
              marginBottom: '48px',
            }}
          >
            Outside the terminal, I'm usually doing{' '}
            <a href="/blog/JiuJitsuBlackbelt" style={linkStyle}>
              Brazilian Jiu-Jitsu
            </a>
            , hiking the Pacific Northwest, or making something weird with my 3D printer.
          </p>

          {/* Writing */}
          <p
            style={{
              fontSize: '15px',
              color: '#333',
              marginBottom: '12px',
            }}
          >
            Some things I've written:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 48px 0' }}>
            {[
              { title: 'Cleaning Files with Python', href: '/blog/cleaning-files-with-python' },
              { title: 'Jiu-Jitsu Black Belt Journey', href: '/blog/JiuJitsuBlackbelt' },
              { title: 'Building a Discord Bot', href: '/blog/discordData' },
              { title: 'FitBit Data Visualization', href: '/blog/fitbit' },
              { title: 'Library Lists Scraper', href: '/blog/libraryLists' },
              { title: 'Self-Hosting My Stack', href: '/blog/selfHosting' },
            ].map(({ title, href }) => (
              <li key={href} style={{ marginBottom: '8px' }}>
                <a href={href} className="post-link" style={{ fontSize: '15px' }}>
                  → {title}
                </a>
              </li>
            ))}
          </ul>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {[
              { label: 'email', href: 'mailto:tdnicola@gmail.com' },
              { label: 'github', href: 'https://github.com/tdnicola' },
              { label: 'linkedin', href: 'https://www.linkedin.com/in/tony-nicola/' },
            ].map(({ label, href }) => (
              <a key={label} href={href} className="social-link" style={{ fontSize: '14px' }}>
                {label}
              </a>
            ))}
          </div>
        </main>

        {/* Preview badge */}
        <div
          style={{
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            background: '#facc15',
            color: '#713f12',
            fontSize: '11px',
            fontWeight: '700',
            padding: '4px 10px',
            borderRadius: '999px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          PREVIEW — leerob.com style
        </div>
      </div>
    </>
  )
}

const linkStyle = {
  color: '#111',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
}

Preview.noLayout = true
export default Preview
