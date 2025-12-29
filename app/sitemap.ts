import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://jasurd.com',
      lastModified: new Date(),
    },
  ]
}