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
              Hello, my name is Tony Nicola, and I’m a Data Engineer with a passion for automating
              workflows and creating innovative data solutions. With a strong background in ETL
              development and tools like SSIS, SQL, and Python. I specialize in designing and
              implementing data pipelines that streamline the extraction, transformation, and
              loading of data across diverse systems.
            </p>

            <p>
              Currently at Palomar, I focus on building robust data pipelines and integrating data
              from various sources using tools such as Azure Synapse, DBT, Snowflake, and Python to
              support advanced analytics. I thrive on collaborating with cross-functional teams,
              translating complex technical concepts into actionable solutions, and aligning data
              strategies with organizational goals.
            </p>

            <p>
              One of my core passions is identifying and automating repetitive tasks, allowing me to
              explore and adopt new technologies that enhance efficiency and scalability. This
              website serves as my creative outlet—a place where I document my progress, share my
              experiences, and discuss the challenges and projects I’ve tackled. By sharing my work,
              I hope to inspire and assist other developers in finding innovative ways to optimize
              their processes.
            </p>

            <p>
              Outside of work, I enjoy practicing Brazilian Jiu-Jitsu, where I’ve earned a black
              belt, exploring the Pacific Northwest, PC gaming, and diving into 3D printing
              projects. Whether it’s refining a data pipeline or perfecting a new skill on the mat,
              I’m constantly striving to improve, grow, and help others do the same.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
