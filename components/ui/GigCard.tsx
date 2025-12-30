'use client';

import { motion } from 'framer-motion';
import { Star, BadgeCheck } from 'lucide-react';

interface GigCardProps {
  title: string;
  price: string;
  username: string;
  category: string;
  rating: number;
  imageUrl?: string;
  verified?: boolean;
}

const GigCard = ({ title, price, username, category, rating, imageUrl, verified }: GigCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      // OPERASI PLASTIK DI SINI:
      // - Border: HP 2px (border-2), Laptop 4px (md:border-4)
      // - Shadow: HP 3px, Laptop 6px
      className="border-2 md:border-4 border-black bg-white flex flex-col relative transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer h-full overflow-hidden"
    >
      {/* Category Tag (Lebih Imut) */}
      <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-yellow-400 border border-black px-1.5 py-0.5 text-[9px] md:text-xs font-bold uppercase tracking-wider z-10 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
        {category}
      </div>

      {/* Image Placeholder (Rasio lebih pendek di HP) */}
      <div className="h-28 md:h-48 w-full bg-slate-100 border-b-2 md:border-b-4 border-black relative overflow-hidden flex items-center justify-center group">
         {imageUrl ? (
            <img src={imageUrl} alt={title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
         ) : (
            // Pattern Dot Background buat placeholder
            <div className="w-full h-full opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px] flex items-center justify-center">
                <span className="text-2xl md:text-4xl grayscale opacity-50">👾</span>
            </div> 
         )}
      </div>

      {/* Content Container (Padding dipangkas) */}
      <div className="p-2 md:p-4 flex flex-col gap-1 md:gap-2 flex-grow justify-between">
        
        {/* Title & User */}
        <div>
            {/* Judul: Text-xs di HP, Text-lg di Laptop. Line-clamp 2 biar gak kepanjangan */}
            <h3 className="font-bold text-xs md:text-lg leading-tight line-clamp-2 mb-1.5 md:mb-2 min-h-[2.5em]">
                {title}
            </h3>
            
            {/* Username Section */}
            <div className="flex items-center gap-1.5 text-[10px] md:text-sm font-medium text-gray-600">
                {/* Avatar user: Kecil banget di HP */}
                <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-blue-500 border border-black flex items-center justify-center text-[8px] md:text-[10px] text-white font-bold shrink-0">
                    {username.charAt(0)}
                </div>
                <span className="truncate max-w-[80px] md:max-w-full">{username}</span>
                {verified && <BadgeCheck className="w-3 h-3 md:w-4 md:h-4 text-blue-600 fill-blue-100 shrink-0" />}
            </div>
        </div>

        {/* Footer Card: Rating & Price */}
        <div className="mt-2 pt-2 border-t border-dashed border-black/30 flex justify-between items-center">
            {/* Rating */}
            <div className="flex items-center gap-1 text-[10px] md:text-xs font-bold bg-black text-white px-1.5 py-0.5 rounded-sm">
                <Star className="w-2 h-2 md:w-3 md:h-3 fill-yellow-400 text-yellow-400" />
                {rating}
            </div>

            {/* Price (Highlight) */}
            <div className="text-right">
                <span className="text-[10px] md:text-xl font-black bg-green-200 px-1 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] md:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] block md:inline-block">
                {price}
                </span>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GigCard;