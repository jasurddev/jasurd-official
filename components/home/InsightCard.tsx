import Link from 'next/link';
import Image from 'next/image';

interface InsightCardProps {
  id: string | number;
  title: string;
  category: string;
  summary?: string;
  image?: string;
  isFeatured?: boolean;
  color?: string;
}

const InsightCard = ({ id, title, category, summary, image, isFeatured, color = 'bg-white' }: InsightCardProps) => {
  return (
    <Link 
      href={`/insight/${id}`}
      className={`
        relative overflow-hidden border-2 border-slate-900 shadow-hard card-hoverable group cursor-pointer rounded-3xl bg-white flex flex-col
        ${isFeatured ? 'md:col-span-2 md:row-span-2 min-h-[400px]' : 'min-h-[250px]'}
      `}
    >
      {/* Image Background */}
      {image ? (
        <div className="absolute inset-0 z-0">
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
           {/* FIX: Gradient Overlay Lebih Gelap biar teks kebaca */}
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
        </div>
      ) : (
        // Fallback kalau gak ada gambar (Pake warna solid)
        <div className={`absolute inset-0 z-0 ${color}`}></div>
      )}

      {/* Content */}
      <div className={`relative z-10 p-5 flex flex-col justify-between flex-grow mt-auto ${image ? 'text-white' : 'text-slate-900'}`}>
        <div>
          <span className={`
            inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border-2 border-slate-900 mb-2
            ${image ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}
          `}>
            {category}
          </span>
          <h3 className={`font-black leading-tight mb-2 group-hover:underline decoration-2 underline-offset-4 ${isFeatured ? 'text-2xl md:text-4xl' : 'text-lg'}`}>
            {title}
          </h3>
          {/* Tampilkan summary kalau featured atau gak ada gambar */}
          {(isFeatured || !image) && summary && (
            <p className={`text-sm font-medium line-clamp-2 ${image ? 'text-slate-300' : 'text-slate-600'}`}>
              {summary}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default InsightCard;