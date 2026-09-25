import React from 'react';

interface CrownLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'gold';
  showTagline?: boolean;
}

export const CrownLogo: React.FC<CrownLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base tracking-[0.2em]',
    md: 'text-lg md:text-xl tracking-[0.25em]',
    lg: 'text-2xl md:text-3xl tracking-[0.3em]',
    xl: 'text-3xl md:text-4xl tracking-[0.35em]',
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Crown Icon */}
      <div className="relative mb-1 flex items-center justify-center">
        {/* Soft Ambient Glow */}
        <div className="absolute inset-0 bg-amber-400/20 blur-md rounded-full -z-10 transform scale-125" />
        
        <svg
          viewBox="0 0 100 70"
          className={`${iconSizes[size]} fill-none drop-shadow-[0_2px_8px_rgba(212,175,55,0.45)]`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldCrownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D6" />
              <stop offset="30%" stopColor="#F5D061" />
              <stop offset="60%" stopColor="#D4AF37" />
              <stop offset="85%" stopColor="#B38728" />
              <stop offset="100%" stopColor="#876011" />
            </linearGradient>
            <linearGradient id="gemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F4D068" />
            </linearGradient>
          </defs>

          {/* Crown Base Band */}
          <path
            d="M15 54 Q50 60 85 54 L88 62 Q50 68 12 62 Z"
            fill="url(#goldCrownGrad)"
          />

          {/* Base Jewels */}
          <circle cx="26" cy="58" r="2.2" fill="url(#gemGrad)" />
          <circle cx="38" cy="59" r="2.2" fill="url(#gemGrad)" />
          <circle cx="50" cy="60" r="3" fill="url(#gemGrad)" />
          <circle cx="62" cy="59" r="2.2" fill="url(#gemGrad)" />
          <circle cx="74" cy="58" r="2.2" fill="url(#gemGrad)" />

          {/* Main Crown Body */}
          <path
            d="M 15 54 
               L 10 26 
               L 32 40 
               L 50 14 
               L 68 40 
               L 90 26 
               L 85 54 
               Q 50 60 15 54 Z"
            fill="url(#goldCrownGrad)"
          />

          {/* Crown Peak Pearls/Diamonds */}
          <circle cx="10" cy="24" r="3.5" fill="url(#gemGrad)" stroke="#876011" strokeWidth="0.8" />
          <circle cx="32" cy="38" r="2.8" fill="url(#gemGrad)" stroke="#876011" strokeWidth="0.6" />
          <circle cx="50" cy="12" r="4.8" fill="url(#gemGrad)" stroke="#876011" strokeWidth="1" />
          <circle cx="68" cy="38" r="2.8" fill="url(#gemGrad)" stroke="#876011" strokeWidth="0.6" />
          <circle cx="90" cy="24" r="3.5" fill="url(#gemGrad)" stroke="#876011" strokeWidth="0.8" />

          {/* Center Crown Emblem Diamond */}
          <polygon
            points="50,26 55,36 50,47 45,36"
            fill="#FFFFFF"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Brand Name */}
      <div className="flex flex-col items-center">
        <span
          className={`font-brand-cinzel font-bold text-white uppercase ${textSizes[size]} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}
        >
          TREND <span className="gold-gradient-text">DELA</span>
        </span>

        {showTagline && (
          <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-amber-200/80 font-medium mt-0.5">
            Achados & Ofertas Exclusivas
          </span>
        )}
      </div>
    </div>
  );
};
