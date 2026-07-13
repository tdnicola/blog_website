import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { PageSeo } from '@/components/SEO'

export default function Projects() {
  return (
    <>
      <PageSeo
        title={`Projects - ${siteMetadata.author}`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/projects`}
      />
      <div style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div
          style={{
            marginBottom: 32,
            borderBottom: '1px solid var(--sp-border)',
            paddingBottom: 24,
          }}
        >
          <h1
            style={{
              fontFamily: '"Orbitron", sans-serif',
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: 'var(--sp-name)',
            }}
          >
            Projects
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {projectsData.map((d) => (
            <Card
              key={d.title}
              title={d.title}
              description={d.description}
              imgSrc={d.imgSrc}
              href={d.href}
            />
          ))}
        </div>
      </div>
    </>
  )
}
