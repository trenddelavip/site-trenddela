import React from 'react';

interface RadarVipEmblemProps {
  className?: string;
}

export const RadarVipEmblem: React.FC<RadarVipEmblemProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center gap-3.5 select-none ${className}`}>
      {/* Radar Wave Graphic Icon */}
      <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center">
        {/* Animated Gold Radar Rings */}
        <div className="absolute inset-0 rounded-full border border-amber-400/30 animate-radar-ring" />
        <div className="absolute -inset-1.5 rounded-full border border-amber-400/20 animate-radar-ring-delay" />
        
        {/* Glow backdrop */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-600/30 via-amber-400/20 to-transparent blur-md" />

        {/* Central Luxury Crest Disc */}
        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#1e1708] via-[#0d1222] to-[#060a14] border border-amber-400/60 shadow-[0_4px_16px_rgba(212,175,55,0.4)] flex items-center justify-center">
          {/* Subtle concentric rings */}
          <div className="absolute w-9 h-9 rounded-full border border-amber-400/40" />
          <div className="absolute w-6 h-6 rounded-full border border-amber-400/50 border-dashed" />
          
          {/* Golden Center Crown / VIP Gem */}
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-amber-300 drop-shadow-[0_1px_4px_rgba(255,215,0,0.8)]"
          >
            <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5Z" />
            <rect x="5" y="17.5" width="14" height="2.5" rx="1.2" fill="#FFE29F" />
          </svg>
        </div>
      </div>

      {/* Brand Text: RADAR VIP DE OFERTAS */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] tracking-[0.28em] uppercase text-amber-300/90 font-semibold">
            GRUPO EXCLUSIVO
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Grupo Ativo" />
        </div>
        
        <div className="font-brand-cinzel font-extrabold text-xl sm:text-2xl tracking-[0.16em] gold-gradient-text leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          RADAR VIP
        </div>

        <div className="text-[11px] sm:text-xs tracking-[0.32em] font-semibold text-slate-200 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
          DE OFERTAS
        </div>
      </div>
    </div>
  );
};
