import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import siteMetadata from '@/data/siteMetadata.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = getAllPosts()
  const mostRecentPostDate = allPosts[0] ? new Date(allPosts[0].date) : new Date()

  const posts = allPosts.map((post) => ({
    url: `${siteMetadata.siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }))

  return [
    {
      url: siteMetadata.siteUrl,
      lastModified: mostRecentPostDate,
    },
    {
      url: `${siteMetadata.siteUrl}/writing`,
      lastModified: mostRecentPostDate,
    },
    ...posts,
  ]
}
