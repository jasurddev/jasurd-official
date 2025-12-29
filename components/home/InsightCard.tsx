import Link from 'next/link';

interface InsightCardProps {
  id: string | number;
  title: string;
  category: string;
  summary?: string; // Optional untuk card kecil
  image?: string;   // Optional background image
  isFeatured?: boolean; // Layout besar
  color?: string;   // Custom background color class (e.g., bg-accent)
}

const InsightCard = ({ id, title, category, summary, image, isFeatured, color = 'bg-white' }: InsightCardProps) => {
  return (
    <Link 
      href={`/insight/${id}`}
      className={`
        block relative overflow-hidden border-2 border-slate-900 shadow-hard card-hoverable group cursor-pointer rounded-3xl
        ${isFeatured ? 'md:col-span-2 min-h-[300px] md:min-h-[400px]' : 'min-h-[250px]'}
        ${color}
      `}
    >
      {/* Background Image (Optional) */}
      {image && (
        <div className="absolute inset-0 z-0">
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 p-6 md:p-8 flex flex-col justify-between h-full ${image ? 'text-white' : 'text-slate-900'}`}>
        
        {/* Badge Category */}
        <div>
          <span className={`
            inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border-2 border-slate-900 mb-3
            ${image ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}
          `}>
            {category}
          </span>
        </div>

        {/* Title & Summary */}
        <div>
          <h3 className={`font-black leading-tight mb-2 group-hover:underline decoration-2 underline-offset-4 ${isFeatured ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'}`}>
            {title}
          </h3>
          
          {summary && (
            <p className={`text-sm font-medium line-clamp-3 ${image ? 'text-slate-200' : 'text-slate-600'}`}>
              {summary}
            </p>
          )}
        </div>

      </div>
    </Link>
  );
};

export default InsightCard;