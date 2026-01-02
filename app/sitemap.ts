export const revalidate = 3600;
import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Init Supabase (Pake cara manual karena sitemap jalan di build time/serverless)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const baseUrl = 'https://jasurd.com';

  // 1. Fetch Semua Artikel
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, updated_at')
    .eq('is_published', true);

  const articleUrls = articles?.map((article) => ({
    url: `${baseUrl}/insight/${article.slug}`,
    lastModified: new Date(article.updated_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  })) || [];

  // 2. Fetch Semua Jasa (Gigs)
  const { data: gigs } = await supabase
    .from('gigs')
    .select('slug, created_at')
    .eq('is_active', true);

  const gigUrls = gigs?.map((gig) => ({
    url: `${baseUrl}/lounge/${gig.slug}`,
    lastModified: new Date(gig.created_at),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  })) || [];

  // 3. Halaman Statis
  const staticRoutes = [
    '',
    '/lounge',
    '/insight',
    '/how-to',
    '/about',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...staticRoutes, ...articleUrls, ...gigUrls];
}