import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime, { ReadTimeResults } from 'reading-time'

const POSTS_DIR = path.join(process.cwd(), 'data', 'blog')

export interface PostFrontMatter {
  title: string
  date: string
  tags?: string[]
  draft?: boolean
  summary?: string
  slug: string
}

export interface PostWithContent {
  frontMatter: PostFrontMatter & { readingTime: ReadTimeResults }
  content: string
}

interface ParsedPost {
  frontMatter: PostFrontMatter
  content: string
}

function assertValidFrontMatter(data: Record<string, unknown>, file: string): void {
  if (typeof data.title !== 'string' || data.title.trim() === '') {
    throw new Error(`Post "${file}" is missing a required "title" in its frontmatter.`)
  }
  if (typeof data.date !== 'string' || Number.isNaN(Date.parse(data.date))) {
    throw new Error(`Post "${file}" is missing a valid "date" in its frontmatter.`)
  }
}

function parsePostFile(file: string): ParsedPost {
  const source = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8')
  const { data, content } = matter(source)
  assertValidFrontMatter(data, file)
  const slug = file.replace(/\.(mdx|md)$/, '')
  return { frontMatter: { ...data, slug } as PostFrontMatter, content }
}

let cachedPosts: ParsedPost[] | null = null

// Single source of truth: reads and parses every post file exactly once per
// process, and is the only place that maps a slug back to its file - every
// other export (listing, static params, sitemap, single-post lookup) derives
// from this so a slug can never resolve to two different files or skip
// frontmatter validation.
function getAllParsedPosts(): ParsedPost[] {
  if (!cachedPosts) {
    const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    const seenSlugs = new Set<string>()
    cachedPosts = files.map((file) => {
      const post = parsePostFile(file)
      if (seenSlugs.has(post.frontMatter.slug)) {
        throw new Error(
          `Duplicate post slug "${post.frontMatter.slug}" - check for both a .md and .mdx file with the same name.`
        )
      }
      seenSlugs.add(post.frontMatter.slug)
      return post
    })
  }
  return cachedPosts
}

export function getAllPosts(): PostFrontMatter[] {
  return getAllParsedPosts()
    .map((post) => post.frontMatter)
    .filter((post) => post.draft !== true)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug)
}

export function getPostBySlug(slug: string): PostWithContent | null {
  const post = getAllParsedPosts().find((p) => p.frontMatter.slug === slug)
  if (!post || post.frontMatter.draft === true) return null

  return {
    frontMatter: {
      ...post.frontMatter,
      readingTime: readingTime(post.content),
    },
    content: post.content,
  }
}

export function getAdjacentPosts(slug: string): {
  prev: PostFrontMatter | null
  next: PostFrontMatter | null
} {
  const posts = getAllPosts()
  const index = posts.findIndex((post) => post.slug === slug)
  if (index === -1) return { prev: null, next: null }

  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  }
}
