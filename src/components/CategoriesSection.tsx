import React from 'react';
import { CATEGORIES_DATA, CategoryItem } from '../data/config';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface CategoriesSectionProps {
  onSelectCategory: (category: CategoryItem) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="categorias" className="relative py-20 md:py-28 bg-[#050811] overflow-hidden">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/5 blur-[160px] rounded-full pointer-events-none -z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seleção Exclusiva</span>
          </div>

          <h2 className="font-brand-cinzel font-bold text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-[0.14em]">
            NAVEGUE POR <span className="gold-gradient-text">CATEGORIAS</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-normal max-w-lg mx-auto">
            Descubra os achados mais desejados organizados com carinho para inspirar seu estilo, sua casa e seu dia a dia.
          </p>

          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto pt-1" />
        </div>

        {/* Grade de 6 Categorias Conforme a Imagem de Referência */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-amber-500/20 bg-[#090e1f] transition-all duration-500 hover:border-amber-400/70 hover:shadow-[0_15px_40px_rgba(212,175,55,0.25)] hover:-translate-y-1.5 flex flex-col justify-end"
              style={{ minHeight: '340px' }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectCategory(cat);
                }
              }}
              aria-label={`Ver achados da categoria ${cat.name}`}
            >
              {/* Imagem de Fundo com Zoom Suave */}
              <div className="absolute inset-0">
                <img
                  src={cat.image}
                  alt={`Categoria ${cat.name} - Trend Dela`}
                  className="w-full h-full object-cover object-center filter brightness-[0.85] group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Degradê escuro para garantir legibilidade e sofisticação */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/60 to-transparent" />
                <div className="absolute inset-0 bg-blue-950/20 mix-blend-multiply" />
              </div>

              {/* Tag Superior */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-200 bg-[#050811]/85 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/30 shadow-md">
                  {cat.tag}
                </span>
              </div>

              {/* Botão de Ação Flutuante */}
              <div className="absolute top-4 right-4 z-10 opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="w-9 h-9 rounded-full bg-amber-400/20 backdrop-blur-md border border-amber-400/60 flex items-center justify-center text-amber-300 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors shadow-lg">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Conteúdo Inferior do Card */}
              <div className="relative z-10 p-6 space-y-2">
                <h3 className="font-brand-cinzel font-bold text-2xl text-white uppercase tracking-wider group-hover:text-amber-200 transition-colors flex items-center justify-between">
                  <span>{cat.name}</span>
                </h3>

                <p className="text-amber-100/90 text-xs sm:text-sm font-serif-luxury italic">
                  {cat.subtitle}
                </p>

                <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed opacity-85 group-hover:opacity-100 transition-opacity">
                  {cat.description}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-amber-400 tracking-wider uppercase">
                  <span>Explorar Achados</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Linha de brilho inferior */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent group-hover:via-amber-400 transition-all" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
