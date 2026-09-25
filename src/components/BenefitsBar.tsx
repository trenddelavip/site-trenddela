import React from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  Sparkles, 
  Tag, 
  Layers 
} from 'lucide-react';
import { BENEFITS_DATA } from '../data/config';

export const BenefitsBar: React.FC = () => {
  const getIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 sm:w-7 sm:h-7 text-amber-700 flex-shrink-0" };
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      case 'ExternalLink':
        return <ExternalLink {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Tag':
        return <Tag {...props} />;
      case 'Grid':
      case 'Layers':
      default:
        return <Layers {...props} />;
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-r from-[#FFFBF2] via-[#FDF6E2] to-[#FFFBF2] text-slate-900 py-8 md:py-10 border-y-2 border-amber-300/60 shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
      {/* Sutil detalhe de textura superior e inferior */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          
          {BENEFITS_DATA.map((benefit) => (
            <div
              key={benefit.id}
              className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/50 shadow-sm transition-transform duration-300 hover:translate-y-[-2px] hover:border-amber-400/60"
            >
              {/* Ícone com círculo champagne sutil */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-100/90 border border-amber-300/80 flex items-center justify-center shadow-sm flex-shrink-0">
                {getIcon(benefit.icon)}
              </div>

              {/* Textos do Benefício */}
              <div className="flex flex-col min-w-0">
                <h3 className="font-brand-cinzel font-bold text-xs sm:text-[13px] tracking-wider text-slate-900 uppercase leading-snug truncate sm:text-clip">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed mt-0.5 font-medium">
                  {benefit.subtitle}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};
