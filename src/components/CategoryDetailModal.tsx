import React from 'react';
import { CategoryItem } from '../data/config';
import { X, ExternalLink, MessageCircle, Sparkles, CheckCircle2, Flame } from 'lucide-react';

interface CategoryDetailModalProps {
  category: CategoryItem | null;
  onClose: () => void;
  whatsappGroupUrl: string;
}

export const CategoryDetailModal: React.FC<CategoryDetailModalProps> = ({
  category,
  onClose,
  whatsappGroupUrl,
}) => {
  if (!category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#090e1d] border border-amber-500/40 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Banner com imagem da categoria */}
        <div className="relative h-44 sm:h-52 w-full flex-shrink-0">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover filter brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090e1d] via-[#090e1d]/50 to-transparent" />

          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-slate-200 hover:text-white hover:bg-black/90 border border-white/20 transition-all cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Título sobre a imagem */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-black/60 px-3 py-1 rounded-full border border-amber-400/30">
              {category.tag}
            </span>
            <h3 className="font-brand-cinzel font-bold text-3xl text-white uppercase tracking-wider mt-2">
              {category.name}
            </h3>
            <p className="text-amber-100/90 text-sm font-serif-luxury italic">
              {category.subtitle}
            </p>
          </div>
        </div>

        {/* Corpo com descrição e achados de exemplo */}
        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-slate-300 text-sm leading-relaxed">
            {category.description}
          </p>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Achados Recentes Enviados no VIP</span>
              </h4>
              <span className="text-[11px] text-slate-400">Verificados hoje</span>
            </div>

            <div className="space-y-2.5">
              {category.sampleItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#0e162d] border border-amber-500/20 hover:border-amber-400/40 transition-colors"
                >
                  <div className="pr-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30">
                        {item.platform}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-400">
                        {item.badge}
                      </span>
                    </div>
                    <div className="text-slate-100 text-sm font-medium mt-1">
                      {item.title}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-xs text-slate-400 block">A partir de</span>
                    <span className="text-sm font-bold text-amber-300">{item.priceEst}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Destaque VIP com Urgência */}
          <div className="space-y-2">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-900/10 border border-amber-400/30 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-amber-400 flex-shrink-0" />
              <div className="text-xs text-slate-300">
                Todos os links com cupons ativos e descontos relâmpago desta categoria são postados primeiro no nosso <strong className="text-amber-200">Radar VIP</strong>.
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] text-amber-300 font-semibold px-2 py-1">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse flex-shrink-0" />
              <span>Últimas vagas no Radar VIP: veja se ainda dá tempo de entrar hoje!</span>
            </div>
          </div>
        </div>

        {/* Rodapé com CTA de WhatsApp */}
        <div className="p-5 bg-[#070b16] border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Voltar
          </button>

          <a
            href={whatsappGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto gold-button-gradient px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-950 text-emerald-950" />
            <span>Receber Achados de {category.name} no VIP</span>
          </a>
        </div>
      </div>
    </div>
  );
};
