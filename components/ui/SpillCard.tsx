import React from 'react';

interface SpillCardProps {
  avatar: string;
  name: string;
  role: string;
  content: string;
  image?: string;
  cuan?: string;
  verified?: boolean;
  isFail?: boolean;
  stats: {
    fire: number;
    laugh: number;
  };
}

const SpillCard: React.FC<SpillCardProps> = ({
  avatar,
  name,
  role,
  content,
  image,
  cuan,
  verified = false,
  isFail = false,
  stats,
}) => {
  return (
    // FIX 1: Ganti min-w-% jadi Fixed Width (w-[280px]) di mobile.
    // Ini bikin ukuran card KONSISTEN di semua HP, gak bakal melebar aneh.
    <div className="min-w-[280px] w-[280px] md:min-w-[350px] md:w-[350px] snap-center bg-white rounded-2xl border-2 border-slate-900 shadow-hard flex-shrink-0 relative p-4 group hover:-translate-y-1 transition-transform flex flex-col h-full">
      
      {/* Verified Badge */}
      {verified && (
        <div className="absolute top-4 right-4 bg-green-100 text-green-700 border-2 border-green-600 px-2 py-0.5 rounded text-[10px] font-black uppercase transform rotate-2 shadow-sm z-10">
          Verified
        </div>
      )}

      {/* Header Profile */}
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 md:w-12 md:h-12 ${isFail ? 'bg-pink-100' : 'bg-slate-900'} rounded-full border-2 border-slate-900 overflow-hidden shrink-0`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-black text-slate-900 text-sm">{name}</h4>
          <p className="text-[10px] text-slate-500 font-bold">{role}</p>
        </div>
      </div>

      {/* Text Content */}
      <p className="text-xs text-slate-800 font-medium leading-relaxed mb-3 border-t-2 border-slate-100 pt-3 flex-grow">
        "{content}"
      </p>

      {/* Proof Image / Fail State */}
      {/* FIX 2: Paksa Aspect Ratio 16:9 (aspect-video). Gambar akan ngikutin lebar card (280px) */}
      <div className={`w-full aspect-video ${isFail ? 'bg-pattern' : 'bg-slate-100'} rounded-xl border-2 border-slate-900 overflow-hidden relative mb-3 flex items-center justify-center`}>
        {isFail ? (
          <>
            <i className="fa-solid fa-comment-slash text-4xl opacity-50 text-slate-300"></i>
            <div className="absolute bottom-2 left-2 bg-red-100 text-red-600 px-2 py-1 rounded-lg text-[10px] font-black border-2 border-red-200">
              Gagal Total
            </div>
          </>
        ) : (
          <>
            {image && (
               // eslint-disable-next-line @next/next/no-img-element
               <img src={image} className="w-full h-full object-cover" alt="Proof" />
            )}
            {cuan && (
              <div className="absolute bottom-2 left-2 bg-slate-900/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-[10px] font-bold border border-white/20 flex items-center gap-1">
                <i className="fa-solid fa-wallet text-green-400"></i> {cuan}
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100 mt-auto">
        <button className="flex items-center gap-1 text-slate-500 hover:text-orange-600 text-[10px] md:text-xs font-bold transition">
          <i className="fa-solid fa-fire"></i> {stats.fire}
        </button>
        <button className="flex items-center gap-1 text-slate-500 hover:text-blue-500 text-[10px] md:text-xs font-bold transition">
          <i className="fa-solid fa-face-laugh-squint"></i> {stats.laugh}
        </button>
        <button className="flex items-center gap-1 text-slate-500 hover:text-green-500 text-[10px] md:text-xs font-bold transition">
          <i className="fa-solid fa-share-nodes"></i> Share
        </button>
      </div>
    </div>
  );
};

export default SpillCard;