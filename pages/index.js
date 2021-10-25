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
              <img src={siteMetadata.openImage} alt="closed?" className="w-48 h-48 rounded-full image-hover " />

            </div>
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
              {siteMetadata.author}
            </h3>
            <div className="text-gray-500 dark:text-gray-400">Data Analyst</div>
            <div className="text-gray-500 dark:text-gray-400">Equiscript</div>
            <div className="flex pt-6 space-x-3">
              <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
              <SocialIcon kind="github" href={siteMetadata.github} />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
            </div>
          </div>
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">
            <p>
              I am a Data Analyst that is having fun learning to automate things.
            </p>
            <p>
              Webdev boot camp grad turned Data Analyst. It took me a whole bootcamp to learn maybe I didn't like web development as much as I thought I would. I spent way too much time trying to center overlapping images (like this site hint hint)... But I really enjoyed coding and messing around with problem solving things. A conundrum...
            </p>
            <p>
              Currently using SQL and python to help solve questions about data. I enjoy coding in Python for it's versatility and vast ability to automate tasks.
            </p>
            <p>
              I'm using this website as a way to keep track and explain problems I've encountered or am having. If you have any questions on any of these projects I'd love to chat about it.
            </p>
            <p>
              In addition to programming, I enjoy practicing Brazilian Jiu Jitsu, pc gaming, and exploring the PNW.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
