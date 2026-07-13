import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import siteMetadata from '@/data/siteMetadata.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${siteMetadata.siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }))

  return [
    {
      url: siteMetadata.siteUrl,
      lastModified: new Date(),
    },
    ...posts,
  ]
}
