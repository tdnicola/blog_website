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
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8 space-x-2">
            <div className="imageBorder">
              <img src={siteMetadata.image} alt="avatar" className="w-48 h-48 rounded-circle" />
              <img
                src={siteMetadata.openImage}
                alt="closed?"
                className="w-48 h-48 rounded-full image-hover "
              />
            </div>
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
              {siteMetadata.author}
            </h3>
            <div className="text-gray-500 dark:text-gray-400">Data Engineer</div>
            <div className="text-gray-500 dark:text-gray-400">CVS Health</div>
            <div className="flex pt-6 space-x-3">
              <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
              <SocialIcon kind="github" href={siteMetadata.github} />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
            </div>
          </div>
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">
            <p>
              Hello, my name is Tony Nicola and I am an ETL developer with a focus on automating
              tasks in the 340B healthcare industry. I have a strong background in using SSIS, SQL,
              Python, and JavaScript to design and implement data pipelines that streamline data
              extraction, transformation, and loading processes.
            </p>

            <p>
              One of my passions is finding ways to automate repetitive and time-consuming tasks,
              and I enjoy learning new technologies and tools that can help me achieve this goal.
            </p>

            <p>
              This website serves as a platform for me to document my progress, share my knowledge
              and experience, and discuss the various projects and problems I have tackled in the
              past. I hope that by sharing my work, I can help other developers and professionals
              find new solutions and improve their own automation efforts.
            </p>

            <p>
              In addition to programming, I enjoy practicing Brazilian Jiu Jitsu, pc gaming, 3d
              printing, and exploring the PNW.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
