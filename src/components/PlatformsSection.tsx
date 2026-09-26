import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

interface PlatformsSectionProps {
  platformLinks: {
    shopee: string;
    amazon: string;
    magalu: string;
    mercadolivre: string;
    tiktokshop: string;
    shein?: string;
    temu?: string;
    aliexpress?: string;
  };
}

export const PlatformsSection: React.FC<PlatformsSectionProps> = ({ platformLinks }) => {
  const platforms = [
    {
      id: 'shopee',
      name: 'Shopee',
      url: platformLinks.shopee || 'https://shopee.com.br',
      color: '#EE4D2D',
      badge: 'Frete & Cupons',
      tagline: 'Achadinhos Virais',
      logo: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="22" fill="#EE4D2D" />
          <path d="M50 22C41.2 22 34 29.2 34 38V42H26C23.8 42 22 43.8 22 46L24.5 74C24.7 76.2 26.5 78 28.7 78H71.3C73.5 78 75.3 76.2 75.5 74L78 46C78 43.8 76.2 42 74 42H66V38C66 29.2 58.8 22 50 22ZM41 38C41 33 45 29 50 29C55 29 59 33 59 38V42H41V38Z" fill="white" />
          <path d="M50 50C44.5 50 40 53.5 40 58C40 64.5 59.5 63 59.5 68.5C59.5 71 55.5 72.5 50 72.5C43.5 72.5 40 69.5 39 67.5" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'amazon',
      name: 'Amazon',
      url: platformLinks.amazon || 'https://amazon.com.br',
      color: '#FF9900',
      badge: 'Entrega Rápida',
      tagline: 'Eletrônicos & Casa',
      logo: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="22" fill="#FFFFFF" />
          {/* Logo Amazon idêntico à Foto 4 enviada pelo usuário */}
          <text x="50%" y="42%" dominantBaseline="middle" textAnchor="middle" fill="#141920" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="21" letterSpacing="-0.5">amazon</text>
          <path d="M28 60C40 68 60 68 70 59" stroke="#FF9900" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M66 56L73 60L67 65" fill="#FF9900" />
        </svg>
      ),
    },
    {
      id: 'magalu',
      name: 'Magalu',
      url: platformLinks.magalu || 'https://magazineluiza.com.br',
      color: '#0086FF',
      badge: 'Confiança Nacional',
      tagline: 'Eletro & Decoração',
      logo: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="22" fill="#0086FF" />
          {/* Logo Magalu com sublinhado arco-íris idêntico à Foto 3 enviada pelo usuário */}
          <text x="50%" y="46%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="21" letterSpacing="-0.5">magalu</text>
          <defs>
            <linearGradient id="magaluRainbow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFCC00" />
              <stop offset="25%" stopColor="#FF3366" />
              <stop offset="50%" stopColor="#CC33FF" />
              <stop offset="75%" stopColor="#00CCFF" />
              <stop offset="100%" stopColor="#00FF66" />
            </linearGradient>
          </defs>
          <rect x="20" y="64" width="60" height="5" rx="2.5" fill="url(#magaluRainbow)" />
        </svg>
      ),
    },
    {
      id: 'mercadolivre',
      name: 'Mercado Livre',
      url: platformLinks.mercadolivre || 'https://mercadolivre.com.br',
      color: '#FFE600',
      badge: 'Compra Garantida',
      tagline: 'Variedade Total',
      logo: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="22" fill="#FFE600" />
          {/* Logo Aperto de Mão Oval do Mercado Livre idêntico à Foto 1 enviada pelo usuário */}
          <ellipse cx="50" cy="50" rx="38" ry="24" fill="#FFE600" stroke="#1E2565" strokeWidth="6" />
          <path d="M22 47C30 45 42 35 50 35C58 35 70 45 78 47V53C70 51 58 65 50 65C42 65 30 51 22 53V47Z" fill="white" stroke="#1E2565" strokeWidth="4.5" />
          <path d="M39 37C44 32 56 32 61 37L50 48L39 37Z" stroke="#1E2565" strokeWidth="4.5" strokeLinejoin="round" fill="white" />
          <path d="M33 50C36 55 43 58 50 58C57 58 64 55 67 50" stroke="#1E2565" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'tiktokshop',
      name: 'TikTok Shop',
      url: platformLinks.tiktokshop || 'https://tiktok.com',
      color: '#FE2C55',
      badge: 'Tendências Virais',
      tagline: 'Vídeos & Achados',
      logo: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="22" fill="#000000" />
          <path d="M68 40.5A18 18 0 0 1 54 26V60A18 18 0 1 1 36 42V51A9 9 0 1 0 45 60V20H54A18 18 0 0 0 68 31.5V40.5Z" fill="#25F4EE" />
          <path d="M65 37.5A18 18 0 0 1 51 23V57A18 18 0 1 1 33 39V48A9 9 0 1 0 42 57V17H51A18 18 0 0 0 65 28.5V37.5Z" fill="#FE2C55" />
          <path d="M66.5 39A18 18 0 0 1 52.5 24.5V58.5A18 18 0 1 1 34.5 40.5V49.5A9 9 0 1 0 43.5 58.5V18.5H52.5A18 18 0 0 0 66.5 30V39Z" fill="white" />
        </svg>
      ),
    },
    {
      id: 'shein',
      name: 'SHEIN',
      url: platformLinks.shein || 'https://shein.com.br',
      color: '#000000',
      badge: 'Moda & Tendência',
      tagline: 'Look do Momento',
      logo: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="22" fill="#000000" />
          <rect x="4" y="4" width="92" height="92" rx="18" stroke="#444444" strokeWidth="2.5" />
          <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="21" letterSpacing="1.5">SHEIN</text>
        </svg>
      ),
    },
    {
      id: 'temu',
      name: 'Temu',
      url: platformLinks.temu || 'https://temu.com',
      color: '#FB7701',
      badge: 'Super Ofertas',
      tagline: 'Preços Inacreditáveis',
      logo: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="22" fill="#FB7701" />
          <text x="50%" y="42%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="23" letterSpacing="1">TEMU</text>
          <path d="M28 66C28 62 33 60 38 60C43 60 48 62 48 66" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <path d="M52 66C52 62 57 60 62 60C67 60 72 62 72 66" stroke="white" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'aliexpress',
      name: 'AliExpress',
      url: platformLinks.aliexpress || 'https://pt.aliexpress.com',
      color: '#E61C43',
      badge: 'Importados Diretos',
      tagline: 'Gadgets & Variedades',
      logo: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="22" fill="#E61C43" />
          {/* Sacola vermelha com Check V Amarelo idêntico à Foto 2 enviada pelo usuário */}
          <path d="M34 26C34 18 41 13 50 13C59 13 66 18 66 26V28H76C78.2 28 80 29.8 80 32L76 82C76 84.2 74.2 86 72 86H28C25.8 86 24 84.2 24 82L20 32C20 29.8 21.8 28 24 28H34V26ZM41 28H59V26C59 21 55 19 50 19C45 19 41 21 41 26V28Z" stroke="white" strokeWidth="5.5" strokeLinejoin="round" fill="none" />
          <path d="M22 51L42 71L82 47" stroke="#FFBA00" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
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
            Monitoramos 24 horas por dia os melhores vendedores, cupons secretos e promoções reais nas 8 maiores plataformas do Brasil e do mundo.
          </p>

          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
        </div>

        {/* Cards das 8 Plataformas Oficiais (2 linhas de 4 cards em desktop / 4 linhas de 2 em mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 sm:gap-6">
          {platforms.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl p-6 sm:p-7 bg-gradient-to-b from-[#0a1024] to-[#070b18] border border-amber-500/30 hover:border-amber-400/80 shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.25)] transition-all duration-300 flex flex-col items-center text-center justify-between hover:-translate-y-1.5 min-h-[230px]"
            >
              {/* Badge Superior */}
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/15 px-2.5 py-1 rounded-full border border-amber-400/30 mb-3">
                {p.badge}
              </span>

              {/* Logotipo da Plataforma */}
              <div className="h-16 sm:h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
                {p.logo}
              </div>

              {/* Nome e Tagline */}
              <div className="mt-3 space-y-1">
                <h3 className="font-extrabold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors">
                  {p.name}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  {p.tagline}
                </p>
              </div>

              {/* Botão sutil de link preparado */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 w-full flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400/90 group-hover:text-amber-300">
                <span>Ver Ofertas</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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

