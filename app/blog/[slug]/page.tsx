import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePrism from 'rehype-prism-plus'
import remarkMath from 'remark-math'
import { getAdjacentPosts, getAllPostSlugs, getPostBySlug } from '@/lib/posts'
import { getImageDimensions } from '@/lib/images'
import SmartLink from '@/components/SmartLink'
import siteMetadata from '@/data/siteMetadata.json'
import 'katex/dist/katex.min.css'

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const { frontMatter } = post
  return {
    title: frontMatter.title,
    description: frontMatter.summary,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: frontMatter.title,
      description: frontMatter.summary,
      url: `/blog/${slug}`,
      type: 'article',
      publishedTime: frontMatter.date,
      images: [siteMetadata.openImage],
    },
  }
}

function PostImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null
  const dimensions = getImageDimensions(src)
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || ''}
      width={dimensions?.width}
      height={dimensions?.height}
      style={{
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 6,
        margin: '24px 0',
      }}
    />
  )
}

const components = {
  img: PostImage,
  a: SmartLink,
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  const { frontMatter, content } = post
  const { prev, next } = getAdjacentPosts(slug)

  return (
    <main
      style={{
        maxWidth: 680,
        margin: '0 auto',
        padding: 'clamp(40px, 6vw, 60px) 20px 80px',
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: 11,
          letterSpacing: '0.1em',
          color: 'var(--sp-social)',
          textDecoration: 'none',
        }}
      >
        &larr; back
      </Link>

      <h1
        style={{
          fontFamily: 'var(--font-orbitron), sans-serif',
          fontSize: 'clamp(26px, 4.5vw, 38px)',
          fontWeight: 700,
          color: 'var(--sp-name)',
          textShadow: '0 0 28px var(--sp-glow)',
          margin: '20px 0 8px',
        }}
      >
        {frontMatter.title}
      </h1>

      <div
        style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: 11,
          color: 'var(--sp-social)',
          letterSpacing: '0.05em',
          marginBottom: 40,
        }}
      >
        {new Date(frontMatter.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        {' · '}
        {frontMatter.readingTime.text}
      </div>

      <article className="prose">
        <MDXRemote
          source={content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [
                rehypeSlug,
                [
                  rehypeAutolinkHeadings,
                  { behavior: 'append', properties: { className: 'anchor' } },
                ],
                rehypeKatex,
                [rehypePrism, { ignoreMissing: true }],
              ],
            },
          }}
        />
      </article>

      {(prev || next) && (
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 20,
            marginTop: 56,
            paddingTop: 24,
            borderTop: '1px solid var(--sp-divider-clr)',
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: 12,
          }}
        >
          <div>
            {prev && (
              <Link
                href={`/blog/${prev.slug}`}
                style={{ color: 'var(--sp-accent)', textDecoration: 'none' }}
              >
                &larr; {prev.title}
              </Link>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                style={{ color: 'var(--sp-accent)', textDecoration: 'none' }}
              >
                {next.title} &rarr;
              </Link>
            )}
          </div>
        </nav>
      )}
    </main>
  )
}
