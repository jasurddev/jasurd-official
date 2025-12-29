import Link from 'next/link';
import Image from 'next/image';

interface GigCardProps {
  id: string | number;
  title: string;
  price: string;
  image?: string;
  category?: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    verified?: boolean;
  };
  type: 'solver' | 'seeker';
  isPremium?: boolean;
}

const GigCard = ({ id, title, price, image, category, user, type, isPremium }: GigCardProps) => {
  return (
    <div 
      className={`relative h-full flex flex-col justify-between
        ${type === 'solver' 
          ? 'bg-white hover:-translate-y-1 hover:shadow-hard' 
          : 'bg-white hover:shadow-hard'
        }
        border-2 ${isPremium ? 'border-yellow-400 bg-yellow-50' : 'border-slate-900'} 
        rounded-2xl p-3 shadow-hard-sm transition-all duration-200 group
      `}
    >
      {/* Badge Premium */}
      {isPremium && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 text-[9px] font-black px-2 py-0.5 rounded-bl-lg border-l-2 border-b-2 border-yellow-500 z-30 pointer-events-none">
          SULTAN 👑
        </div>
      )}

      {/* AREA 1: KLIK KE DETAIL JASA */}
      {/* Kita kasih z-0 biar dia layer paling bawah */}
      <Link href={`/lounge/${id}`} className="flex-grow block relative z-0">
        {/* Image Section */}
        {type === 'solver' && image ? (
          <div className={`aspect-square bg-slate-100 rounded-xl mb-3 overflow-hidden relative border-2 ${isPremium ? 'border-yellow-200' : 'border-slate-100'} group-hover:border-slate-900 transition`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <div className="absolute bottom-2 right-2 bg-accent px-2 py-1 rounded-lg text-xs font-black border-2 border-slate-900 shadow-sm">
              {price}
            </div>
          </div>
        ) : (
          <div className="mb-4">
             <div className="flex justify-between items-start mb-2">
                <span className="bg-red-500 text-white px-2 py-1 rounded text-[10px] font-black uppercase inline-block border-2 border-slate-900 transform -rotate-1">
                  URGENT
                </span>
                <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                  {price}
                </span>
             </div>
          </div>
        )}

        <h3 className={`font-bold text-slate-900 text-sm mb-2 leading-snug line-clamp-2 ${type === 'seeker' ? 'text-lg' : ''}`}>
          {title}
        </h3>
      </Link>
      
      {/* AREA 2: KLIK KE PROFIL USER */}
      {/* FIX: pointer-events-auto + z-20 + transform-none untuk memastikan dia menang klik */}
      <div className={`pt-2 border-t ${isPremium ? 'border-yellow-200' : 'border-slate-100'} mt-auto relative z-20 pointer-events-auto`}>
        <Link 
          href={`/u/${user.username}`} 
          className="flex items-center gap-2 hover:bg-slate-100 p-1.5 -ml-1.5 rounded-lg transition-colors w-full cursor-pointer"
        >
          <div className="w-6 h-6 bg-slate-200 rounded-full overflow-hidden border border-slate-300 shrink-0">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
          </div>
          <span className="text-xs text-slate-500 font-bold truncate hover:text-primary hover:underline">
            @{user.username}
          </span>
        </Link>
      </div>

    </div>
  );
};

export default GigCard;