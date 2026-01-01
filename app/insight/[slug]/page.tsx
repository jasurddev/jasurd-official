import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { Metadata } from 'next';

// 1. GENERATE METADATA (Server Side)
// Ini biar judul tab browser & gambar share WA sesuai artikel
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createClient();
  
  const { data: article } = await supabase
    .from('articles')
    .select('title, summary, image_url')
    .eq('slug', params.slug)
    .single();

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan | JASURD',
    };
  }

  return {
    title: `${article.title} | Insight JASURD`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `https://jasurd.com/insight/${params.slug}`,
      siteName: 'JASURD',
      images: [
        {
          url: article.image_url || 'https://jasurd.com/opengraph-image.png', // Fallback ke default
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary,
      images: [article.image_url || 'https://jasurd.com/opengraph-image.png'],
    },
  };
}

// 2. HALAMAN UTAMA (Client Component buat interaksi)
// Kita pisah logic fetch client-side di sini atau pake server component langsung.
// Biar simpel dan konsisten sama kode sebelumnya, kita tetep pake Client Component buat render UI-nya.
// TAPI, karena generateMetadata butuh server, file ini harus jadi Server Component secara default.
// Jadi kita hapus 'use client' di paling atas, dan pindahin interaksi (tombol share) ke component kecil terpisah.

// TAPI TUNGGU, biar gak ribet refactor banyak, kita pake trik:
// Kita tetep pake 'use client' tapi metadata-nya kita akalin atau kita biarin server component tapi fetch datanya di server.

// OPSI TERBAIK SAAT INI (Server Component Full):
// Ini lebih cepet dan SEO friendly.

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  
  // Fetch di Server (Lebih Cepat & SEO Bagus)
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-2">404</h1>
        <p className="text-slate-500 font-bold mb-6">Artikelnya ilang atau belum ditulis, Bos.</p>
        <Link href="/insight" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold">Balik ke Insight</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      
      {/* Hero Image */}
      <div className="h-64 md:h-96 relative w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="absolute top-20 left-4 md:left-6 z-20">
          <Link href="/insight" className="w-10 h-10 bg-white/20 backdrop-blur border-2 border-white/50 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition shadow-lg">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-black/90 to-transparent">
          <div className="max-w-3xl mx-auto">
            <span className="bg-accent text-slate-900 px-3 py-1 rounded-lg text-[10px] font-black uppercase mb-3 inline-block border border-slate-900 shadow-sm">
              {article.category}
            </span>
            <h1 className="text-2xl md:text-5xl font-black text-white leading-tight mb-2 drop-shadow-md">
              {article.title}
            </h1>
            <p className="text-xs md:text-sm font-bold text-slate-300">
              {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} • Oleh {article.author}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <article 
          className="prose prose-slate prose-lg max-w-none font-medium text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        {/* Share Section (Client Component Kecil) */}
        {/* Kita pake link manual aja biar gak perlu component terpisah */}
        <div className="mt-12 pt-8 border-t-2 border-slate-100 flex justify-between items-center">
          <p className="text-sm font-bold text-slate-500">Suka artikel ini?</p>
          <a 
            href={`https://wa.me/?text=Cek artikel ini: https://jasurd.com/insight/${params.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary transition shadow-hard border-2 border-slate-900 active:translate-y-0.5 active:shadow-none"
          >
            <i className="fa-brands fa-whatsapp"></i> Share WA
          </a>
        </div>
      </div>

    </div>
  );
}