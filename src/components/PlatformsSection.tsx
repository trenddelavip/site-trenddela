import React from 'react';
import { ExternalLink, Check, Sparkles } from 'lucide-react';

interface PlatformsSectionProps {
  platformLinks: {
    shopee: string;
    amazon: string;
    magalu: string;
    mercadolivre: string;
    tiktokshop: string;
  };
}

export const PlatformsSection: React.FC<PlatformsSectionProps> = ({ platformLinks }) => {
  const platforms = [
    {
      id: 'shopee',
      name: 'Shopee',
      url: platformLinks.shopee,
      color: '#EE4D2D',
      badge: 'Frete & Cupons',
      tagline: 'Achadinhos Virais',
      logo: (
        <svg viewBox="0 0 48 48" className="w-10 h-10" fill="currentColor">
          <path d="M38 15h-4.2C33.2 8.4 29.2 4 24 4s-9.2 4.4-9.8 11H10c-2.2 0-4 1.8-4 4l3.5 22.5c.3 1.9 2 3.5 4 3.5h21c2 0 3.7-1.6 4-3.5L42 19c0-2.2-1.8-4-4-4zm-14-7c3.3 0 6 3.1 6.8 8H17.2c.8-4.9 3.5-8 6.8-8zm4.4 23.3c-1.3 1.3-3.1 1.7-5.1 1.7-2.3 0-4.3-.7-5.5-1.9-.3-.3-.3-.9.1-1.2l1.6-1.3c.3-.3.8-.2 1.1.1.8.8 2 1.3 3.1 1.3 1 0 1.9-.3 2.5-.8.5-.4.7-.9.7-1.5 0-.7-.4-1.2-1.8-1.6l-2.4-.7c-2.6-.7-4.1-2.1-4.1-4.4 0-1.8.9-3.2 2.4-4.1 1.3-.8 3-.9 4.7-.9 2 0 3.6.5 4.8 1.4.3.2.4.7.1 1l-1.4 1.6c-.3.3-.7.4-1.1.1-.9-.7-1.8-1-2.8-1-1 0-1.7.3-2.1.7-.4.4-.6.8-.6 1.3 0 .7.5 1.1 1.7 1.4l2.5.7c2.9.8 4.2 2.2 4.2 4.4 0 1.7-.8 3.2-2.2 4.3z" />
        </svg>
      ),
    },
    {
      id: 'amazon',
      name: 'Amazon',
      url: platformLinks.amazon,
      color: '#FF9900',
      badge: 'Entrega Rápida',
      tagline: 'Eletrônicos & Casa',
      logo: (
        <svg viewBox="0 0 48 48" className="w-10 h-10" fill="currentColor">
          <path d="M25.3 34.6c-7.6 0-14.7-2.9-19.8-7.8-.8-.7-.2-1.7.8-1.2 6.5 3.3 13.9 4.7 20.6 3.6 4.9-.8 9.3-3 13.1-6.4.7-.6 1.5.2 1 .9-4.2 4.9-9.8 8.6-15.7 10.9zm13.9-4.1c-.6-.7-3.9-.3-5.7.3-.6.2-.6-.4-.1-.7 3.3-2.3 8.7-1.6 9.3-.9.6.8-.2 6.3-3.3 8.8-.5.4-.9.2-.7-.3 1-1.8 1.1-6.5.5-7.2zm-12.7-7.7c0 3.8-2 6-5.4 6-3 0-4.6-2.1-4.6-5.1 0-4.8 3.5-7.1 8.8-7.1v1.5c-4 0-6.1 1.2-6.1 4.5 0 2 1 3.2 2.8 3.2 2.3 0 4.5-1.9 4.5-5.1v-8.2c-.3 0-.6.1-.9.1-3.6.4-7.5 1.5-10.4 3.4-.6.4-1.1-.1-.8-.7 2.4-4.5 6.8-7 12.8-7 1.8 0 3.3.4 4.3 1.2 1.4 1.1 1.7 2.8 1.7 5.1v8.8c0 1.9.1 3.8.7 5.5.2.6-.3 1-.8.8-1.4-.7-2.3-2.2-2.6-3.8z" />
        </svg>
      ),
    },
    {
      id: 'magalu',
      name: 'Magalu',
      url: platformLinks.magalu,
      color: '#0086FF',
      badge: 'Confiança Nacional',
      tagline: 'Eletro & Decoração',
      logo: (
        <div className="w-10 h-10 rounded-full bg-[#0086FF] flex items-center justify-center font-black text-white text-xs tracking-tighter shadow-md">
          <span className="font-sans font-black text-sm">M</span>
        </div>
      ),
    },
    {
      id: 'mercadolivre',
      name: 'Mercado Livre',
      url: platformLinks.mercadolivre,
      color: '#FFE600',
      badge: 'Compra Garantida',
      tagline: 'Variedade Total',
      logo: (
        <svg viewBox="0 0 48 48" className="w-10 h-10 text-amber-300" fill="currentColor">
          <path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4zm0 6c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zm8 25.2c-2.4 1.8-5.1 2.8-8 2.8s-5.6-1-8-2.8v-2.3c2.4-2.1 5.1-3.2 8-3.2s5.6 1.1 8 3.2v2.3z" />
        </svg>
      ),
    },
    {
      id: 'tiktokshop',
      name: 'TikTok Shop',
      url: platformLinks.tiktokshop,
      color: '#FE2C55',
      badge: 'Tendências Virais',
      tagline: 'Vídeos & Achados',
      logo: (
        <svg viewBox="0 0 48 48" className="w-10 h-10" fill="currentColor">
          <path d="M38.2 14.8a9.7 9.7 0 0 1-7.5-8.5V4h-6.9v27.3c0 3.2-2.6 5.8-5.8 5.8-3.2 0-5.8-2.6-5.8-5.8 0-3.2 2.6-5.8 5.8-5.8.6 0 1.2.1 1.8.3v-7.1c-.6-.1-1.2-.1-1.8-.1-7.1 0-12.8 5.7-12.8 12.8 0 7.1 5.7 12.8 12.8 12.8 7.1 0 12.8-5.7 12.8-12.8V19.9c3.2 2.3 7.2 3.6 11.4 3.7v-7c-1.5-.1-3-.7-4-1.8z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="ofertas" className="relative py-20 md:py-26 bg-[#040712] border-t border-amber-500/15 overflow-hidden">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none -z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho Conforme a Imagem de Referência */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
            PARCERIAS E CURADORIA
          </span>

          <h2 className="font-brand-cinzel font-bold text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-wider">
            NOSSAS <span className="gold-gradient-text">PLATAFORMAS</span>
          </h2>

          <div className="pt-2">
            <p className="font-serif-luxury text-xl sm:text-2xl text-amber-100 italic font-semibold">
              “Tudo que você ama, mais perto de você!”
            </p>
          </div>

          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto pt-1 font-normal">
            Monitoramos 24 horas por dia os melhores vendedores, cupons secretos e promoções reais nas 5 maiores plataformas do Brasil.
          </p>

          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
        </div>

        {/* Cards das 5 Plataformas Oficiais */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {platforms.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl p-5 bg-gradient-to-b from-[#0a1024] to-[#070b18] border border-amber-500/20 hover:border-amber-400/60 shadow-[0_8px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_12px_30px_rgba(212,175,55,0.2)] transition-all duration-300 flex flex-col items-center text-center justify-between hover:-translate-y-1"
            >
              {/* Badge Superior */}
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-300/80 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20 mb-3">
                {p.badge}
              </span>

              {/* Logotipo da Plataforma */}
              <div className="h-16 flex items-center justify-center text-slate-100 group-hover:scale-110 transition-transform duration-300">
                {p.logo}
              </div>

              {/* Nome e Tagline */}
              <div className="mt-3 space-y-0.5">
                <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                  {p.name}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {p.tagline}
                </p>
              </div>

              {/* Botão sutil de link preparado */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 w-full flex items-center justify-center gap-1 text-[11px] font-semibold text-amber-400/90 group-hover:text-amber-300">
                <span>Ver Ofertas</span>
                <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </div>

        {/* Faixa Informativa de Transparência */}
        <div className="mt-12 p-4 rounded-2xl bg-[#090f23]/60 border border-amber-500/20 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-xs text-slate-300">
              <strong className="text-amber-200">Segurança Absoluta:</strong> Todos os pagamentos e envios são processados diretamente dentro das plataformas oficiais que você já confia.
            </p>
          </div>
          <span className="text-[11px] text-slate-400 whitespace-nowrap">
            Links 100% seguros
          </span>
        </div>

      </div>
    </section>
  );
};
