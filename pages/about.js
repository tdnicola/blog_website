import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { PageSeo } from '@/components/SEO'

export default function About() {
  return (
    <>
      <PageSeo
        title={`About - ${siteMetadata.author}`}
        description={`About me - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/about`}
      />
      <div style={{ padding: '48px 0 80px' }}>
        <div style={{ marginBottom: 40 }}>
          <h1
            style={{
              fontFamily: '"Orbitron", sans-serif',
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: 'var(--sp-name)',
              textShadow: '0 0 24px var(--sp-glow)',
            }}
          >
            About
          </h1>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--sp-border)',
            paddingTop: 32,
          }}
        >
          <div className="xl:grid xl:grid-cols-3 xl:gap-x-8">
            {/* Photo + info column */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: 32,
                gap: 12,
                marginBottom: 32,
              }}
            >
              <div
                className="imageBorder"
                style={{
                  boxShadow: '0 0 40px rgba(147,197,253,0.2), 0 0 80px rgba(147,197,253,0.06)',
                }}
              >
                <img src={siteMetadata.image} alt="avatar" className="w-48 h-48 rounded-circle" />
                <img
                  src={siteMetadata.openImage}
                  alt="closed?"
                  className="w-48 h-48 rounded-full image-hover"
                />
              </div>
              <h3
                style={{
                  fontFamily: '"Orbitron", sans-serif',
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: 'var(--sp-name)',
                  paddingTop: 16,
                  paddingBottom: 4,
                }}
              >
                {siteMetadata.author}
              </h3>
              <div
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: 11,
                  color: 'var(--sp-social)',
                  letterSpacing: '0.05em',
                }}
              >
                Data Engineer
              </div>
              <div
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: 11,
                  color: 'var(--sp-social)',
                  letterSpacing: '0.05em',
                }}
              >
                Palomar
              </div>
              <div style={{ display: 'flex', gap: 16, paddingTop: 16 }}>
                <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
                <SocialIcon kind="github" href={siteMetadata.github} />
                <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
              </div>
            </div>

            {/* Bio column */}
            <div
              className="prose dark:prose-dark max-w-none xl:col-span-2"
              style={{ paddingTop: 32, paddingBottom: 32 }}
            >
              <p>
                Hey, I&apos;m Tony Nicola, a data engineer by day, Brazilian Jiu-Jitsu hobbyist by
                evening, and full-time dad with a mild obsession for automating everything (except
                bedtime routines... those are non-negotiable).
              </p>
              <p>
                I wrangle data into shape using tools like SQL, Python, Airflow, Snowflake, and DBT.
                I specialize in building pipelines that move data cleanly from point A to point B,
                ideally without catching fire. I currently work at Palomar, where I help design
                systems that make teams say &quot;oh thank god&quot; instead of &quot;who built
                this?&quot;
              </p>
              <p>
                If a job feels like it should be automated, I&apos;ll script it and set it loose to
                run in the background like a digital Roomba.
              </p>
              <p>
                This site is where I document what I&apos;m building, breaking, fixing, or
                over-engineering. Expect a mix of dev logs, side projects, and bad jokes embedded in
                technical posts.
              </p>
              <p>
                Outside the terminal, I&apos;m usually doing something that involves grappling,
                hiking around the Pacific Northwest, assembling tiny robots, or making something
                weird with my 3D printer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
