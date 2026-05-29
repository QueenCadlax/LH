import React from 'react';
import { Eatery } from '../types';
import { MapPin, Star } from 'lucide-react';

const EateryCard: React.FC<{ eatery: Eatery; onView: (id: string) => void; onContact?: (eatery: Eatery) => void }> = React.memo(({ eatery, onView, onContact }) => {
  const menuTeaser = eatery.menu && eatery.menu.length ? eatery.menu.slice(0,2).map(m => `${m.itemName} • ${m.price}`).join(' | ') : '';

  return (
    <div className="group relative bg-[#000000] rounded-2xl overflow-hidden cursor-pointer transition-all duration-400 hover:shadow-2xl shadow-lg flex flex-col h-full">
      <div className="relative flex-shrink-0 h-56">
        <img src={eatery.images?.[0] || ''} alt={eatery.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-t-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        <div className="absolute top-3 left-3 flex gap-2">
          {eatery.premiumTier === 'Platinum' && (
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-[10px] font-light uppercase px-2 py-0.5 rounded-full shadow-lg" style={{fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", letterSpacing: '0.12em', fontWeight: 500}}>Platinum</div>
          )}
          {eatery.premiumTier === 'Elite' && (
            <div className="bg-gradient-to-r from-[#E0C36A] to-[#C9A24D] text-black text-[10px] font-light uppercase px-2 py-0.5 rounded-full shadow-[0_6px_20px_rgba(201,162,77,0.18)]" style={{fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", letterSpacing: '0.12em', fontWeight: 600}}>Elite</div>
          )}
          {eatery.verified && (
            <div className="bg-[#0b0b0b] text-[#E0C36A] text-[10px] font-light px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border border-[#E0C36A]/30" style={{fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", letterSpacing: '0.03em', fontWeight: 500}}>✓ Verified</div>
          )}
        </div>
      </div>

      <div className="flex-1 p-5 bg-[#0b0b0b] border-t border-white/5 flex flex-col space-y-2">
        <div className="flex-shrink-0">
          <h3 className="text-lg md:text-xl font-serif font-light text-white leading-snug tracking-wide line-clamp-2" style={{fontFamily: "'Georgia', 'Garamond', serif", fontWeight: 300, letterSpacing: '0.02em'}}>{eatery.name}</h3>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs md:text-sm font-light" style={{fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", letterSpacing: '0.01em'}}>
            <div className="flex items-center gap-0.5 text-[#E0C36A] font-normal">★ {eatery.rating?.toFixed(1) || '—'}</div>
            <div className="text-[#4a4a4a] text-[10px]">•</div>
            <div className="text-gray-400 text-xs md:text-sm line-clamp-1">{eatery.category}</div>
          </div>
        </div>

        <div className="flex items-center text-xs md:text-sm text-gray-400 flex-shrink-0 font-light" style={{fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", letterSpacing: '0.005em'}}>
          <div className="flex items-center gap-1 line-clamp-1"><MapPin size={14} className="text-[#C9A24D] flex-shrink-0"/> <span className="line-clamp-1 text-xs md:text-sm">{typeof eatery.location === 'string' ? eatery.location : eatery.location.area}</span></div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-1.5 flex-shrink-0">
          <button onClick={() => onView(eatery.id)} className="flex-1 bg-gradient-to-r from-[#E0C36A] to-[#C9A24D] text-black px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 hover:shadow-[0_8px_24px_rgba(201,162,77,0.25)] hover:scale-105" style={{fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: 500, letterSpacing: '0.02em'}}>View</button>
          <button onClick={() => onContact && onContact(eatery)} className="border border-[#C9A24D]/40 text-[#E0C36A] px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 hover:border-[#C9A24D]/80 hover:bg-white/5" style={{fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: 500, letterSpacing: '0.02em'}}>Info</button>
        </div>
      </div>
    </div>
  );
});

EateryCard.displayName = 'EateryCard';
export default EateryCard;
