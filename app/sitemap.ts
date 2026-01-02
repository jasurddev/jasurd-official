import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

// Cache pendek biar sitemap cepat update (penting untuk domain baru)
export const revalidate = 300 // 5 menit

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const baseUrl = 'https://jasurd.com'
  const now = new Date()

  /* =========================
   * 1. HALAMAN STATIS (SEO)
   * ========================= */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/lounge`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/insight`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-to`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  /* =========================
   * 2. ARTIKEL INSIGHT
   * ========================= */
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, updated_at')
    .eq('is_published', true)

  const articlePages: MetadataRoute.Sitemap =
    articles?.map((article) => ({
      url: `${baseUrl}/insight/${article.slug}`,
      lastModified: article.updated_at
        ? new Date(article.updated_at)
        : now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })) ?? []

  /* =========================
   * 3. GIG / JASA (LOUNGE)
   * ========================= */
  const { data: gigs } = await supabase
    .from('gigs')
    .select('slug, updated_at, created_at')
    .eq('is_active', true)

  const gigPages: MetadataRoute.Sitemap =
    gigs?.map((gig) => ({
      url: `${baseUrl}/lounge/${gig.slug}`,
      lastModified: gig.updated_at
        ? new Date(gig.updated_at)
        : new Date(gig.created_at),
      changeFrequency: 'daily',
      priority: 0.8,
    })) ?? []

  /* =========================
   * FINAL RETURN
   * ========================= */
  return [...staticPages, ...articlePages, ...gigPages]
}
