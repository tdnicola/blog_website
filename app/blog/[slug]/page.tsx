import type { Metadata } from 'next'
import Image from 'next/image'
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
import BackLink from '@/components/BackLink'
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
      images: [{ url: siteMetadata.openImage, width: 1200, height: 630 }],
    },
  }
}

const imageStyle = {
  display: 'block',
  maxWidth: '100%',
  height: 'auto',
  borderRadius: 6,
  margin: '24px 0',
} as const

function PostImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null
  const dimensions = getImageDimensions(src)

  // Local /public images have known dimensions and get Next's automatic
  // optimization/lazy-loading. Remote images (a few older posts embed
  // external URLs) fall back to a plain <img> rather than allowlisting
  // arbitrary external hosts in next.config.js for one-off legacy content.
  if (dimensions) {
    return (
      <Image
        src={src}
        alt={alt || ''}
        width={dimensions.width}
        height={dimensions.height}
        style={imageStyle}
      />
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt || ''} style={imageStyle} />
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

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontMatter.title,
    description: frontMatter.summary,
    datePublished: frontMatter.date,
    url: `${siteMetadata.siteUrl}/blog/${slug}`,
    author: {
      '@type': 'Person',
      name: siteMetadata.author,
    },
  }

  return (
    <main
      style={{
        maxWidth: 680,
        margin: '0 auto',
        padding: 'clamp(40px, 6vw, 60px) 20px 80px',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />

      <BackLink href="/">&larr; Tony Nicola</BackLink>

      <div
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 11,
          color: 'var(--muted)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          margin: '20px 0 8px',
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

      <h1
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 'clamp(26px, 4.5vw, 38px)',
          fontWeight: 600,
          color: 'var(--ink)',
          textTransform: 'uppercase',
          margin: '0 0 40px',
        }}
      >
        {frontMatter.title}
      </h1>

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
            borderTop: '1px dashed var(--divider)',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 12,
          }}
        >
          <div>
            {prev && (
              <Link
                href={`/blog/${prev.slug}`}
                style={{
                  color: 'var(--orange-text)',
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                  display: 'inline-flex',
                  alignItems: 'center',
                  minHeight: 44,
                }}
              >
                &larr; {prev.title}
              </Link>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                style={{
                  color: 'var(--orange-text)',
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  minHeight: 44,
                }}
              >
                {next.title} &rarr;
              </Link>
            )}
          </div>
        </nav>
      )}

      <div
        style={{
          marginTop: 40,
          paddingTop: 24,
          borderTop: '1px dashed var(--divider)',
        }}
      >
        <BackLink href="/writing">&larr; All writing</BackLink>
      </div>
    </main>
  )
}
