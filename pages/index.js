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
            <div className="text-gray-500 dark:text-gray-400">Palomar</div>
            <div className="flex pt-6 space-x-3">
              <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
              <SocialIcon kind="github" href={siteMetadata.github} />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
            </div>
          </div>
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">
            <p>
              Hey, I’m Tony Nicola, a data engineer by day, Brazilian Jiu-Jitsu hobbyist by evening,
              and full-time dad with a mild obsession for automating everything (except bedtime
              routines... those are non-negotiable).
            </p>

            <p>
              By trade, I wrangle data into shape using tools like SQL, Python, Airflow, Snowflake,
              and DBT. I specialize in building pipelines that move data cleanly from point A to
              point B, ideally without catching fire. I currently work at Palomar, where I help
              design systems that make teams say “oh thank god” instead of “who built this?”
            </p>

            <p>
              I get a weird amount of joy from eliminating repetitive tasks and streamlining
              workflows. If a job feels like it should be automated, I’ll quietly script it, give it
              a name, and set it loose to run in the background like a digital Roomba.
            </p>

            <p>
              This site is where I document what I’m building, breaking, fixing, or
              over-engineering. Expect a mix of dev logs, side projects, and bad jokes embedded in
              technical posts.
            </p>
            <p>
              Outside the terminal, I’m usually doing something that involves grappling, hiking
              around the Pacific Northwest, assembling tiny robots, or making something weird with
              my 3D printer. Life is a string of small experiments, and I like to run a lot of them.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
