import React, { useState, useEffect } from 'react';
import { RadarVipEmblem } from './RadarVipEmblem';
import { MessageCircle, ShieldCheck, Sparkles, CheckCircle2, ArrowRight, Flame, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  whatsappGroupUrl: string;
  onOpenHowItWorks: () => void;
  heroImages?: string[];
}

export const Hero: React.FC<HeroProps> = ({ whatsappGroupUrl, onOpenHowItWorks, heroImages }) => {
  const defaultImages = [
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85",
  ];

  const imagesList = (heroImages && heroImages.filter(img => img && img.trim() !== '').length > 0)
    ? heroImages.filter(img => img && img.trim() !== '')
    : defaultImages;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (imagesList.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imagesList.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [imagesList.length, isHovered]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % imagesList.length);
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#04060d] via-[#070d1e] to-[#050811]"
    >
      {/* Golden Ambient Lighting and Luxury Glow Background */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent blur-[140px] rounded-full pointer-events-none -z-0" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-900/15 blur-[120px] rounded-full pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-0" />

      {/* Subtle Luxury Pattern Lines */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LADO ESQUERDO: CONTEÚDO, TEXTOS E CTA PRINCIPAL (7 colunas) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Top Badge: Logotipo RADAR VIP DE OFERTAS em destaque */}
            <div className="p-1 px-2 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-400/30 backdrop-blur-md shadow-lg inline-flex">
              <RadarVipEmblem />
            </div>

            {/* Cabeçalho de Boas-vindas e Marca */}
            <div className="space-y-1">
              <span className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] block">
                BEM-VINDA À
              </span>
              
              <h1 className="font-brand-cinzel font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.12em] text-white uppercase leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                TREND <span className="gold-gradient-text">DELA</span>
              </h1>
            </div>

            {/* Slogan Oficial em Destaque */}
            <div className="relative">
              <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-amber-100 font-bold leading-snug tracking-wide">
                ACHADOS SELECIONADOS,<br className="hidden sm:inline" />
                <span className="gold-gradient-text-bright italic font-semibold">
                  {' '}DESCOBERTAS QUE ENCANTAM.
                </span>
              </h2>
              <div className="h-[2px] w-24 bg-gradient-to-r from-amber-400 to-transparent mt-3 mx-auto lg:mx-0" />
            </div>

            {/* Texto de Apoio Exato */}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-normal text-slate-300/90">
              Aqui você encontra produtos desejados, úteis e em alta, das melhores plataformas de compras, tudo em um só lugar. Mais praticidade, mais estilo, mais para você!
            </p>

            {/* DESTAQUE PRINCIPAL DA PÁGINA: BOTÃO DOURADO RADAR VIP */}
            <div className="w-full sm:w-auto pt-2 space-y-3">
              {/* Alerta Estratégico de Vagas Limitadas em Destaque */}
              <div className="flex items-center justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/25 via-red-500/20 to-amber-600/25 border-2 border-amber-400 text-amber-100 text-[11px] sm:text-xs md:text-sm font-extrabold uppercase tracking-wide shadow-[0_0_25px_rgba(212,175,55,0.4)] backdrop-blur-md text-center max-w-full">
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-500 animate-ping flex-shrink-0" />
                  <span className="text-sm sm:text-base">🔥</span>
                  <span className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] leading-tight">
                    Últimas vagas do lote, ainda dá tempo !
                  </span>
                </div>
              </div>

              <a
                href={whatsappGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="link-whatsapp-hero"
                className="gold-button-gradient group relative w-full sm:w-auto px-5 py-3.5 sm:px-9 sm:py-5 rounded-2xl font-bold text-xs sm:text-sm md:text-base tracking-[0.08em] sm:tracking-[0.12em] uppercase flex items-center justify-center gap-2.5 sm:gap-3.5 shadow-[0_15px_35px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-1 active:translate-y-0"
              >
                {/* Ícone WhatsApp com destaque */}
                <div className="w-8 h-8 rounded-full bg-emerald-950/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5 text-emerald-950 fill-emerald-900" />
                </div>

                <span className="font-extrabold text-slate-950 text-center">
                  ENTRAR NOS GRUPOS DO RADAR VIP DE OFERTAS
                </span>

                <ArrowRight className="w-5 h-5 text-slate-900 transition-transform group-hover:translate-x-1 hidden sm:block flex-shrink-0" />
              </a>

              {/* Informação transparente do WhatsApp */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-amber-200/80 pt-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  Acesso 100% Gratuito
                </span>
                <span className="hidden sm:inline opacity-40">·</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  Links Diretos Sem Burocracia
                </span>
                <span className="hidden sm:inline opacity-40">·</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  Plataformas Verificadas
                </span>
              </div>
            </div>

            {/* Micro Prova Social */}
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-amber-400/40 object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Membro VIP Trend Dela"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-amber-400/40 object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                  alt="Membro VIP Trend Dela"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-amber-400/40 object-cover"
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                  alt="Membro VIP Trend Dela"
                />
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 ring-2 ring-amber-400/50 flex items-center justify-center text-[10px] font-bold text-white">
                  +15k
                </div>
              </div>
              <div className="text-left">
                <span className="font-semibold text-slate-200">Mais de 15.000 clientes</span> já economizam todos os dias com as nossas seleções.
              </div>
            </div>

          </div>

          {/* LADO DIREITO: A MODELO COM ÓCULOS ESCUROS E SACOLAS DE COMPRAS (5 colunas) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Halo / Moldura de Iluminação Dourada Sofisticada */}
            <div className="relative w-full max-w-[420px] lg:max-w-none">
              
              {/* Moldura Dourada com Efeito Vidro Escuro */}
              <div className="relative rounded-3xl p-2 bg-gradient-to-b from-amber-400/40 via-amber-500/10 to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                
                {/* Container da Imagem com overflow-hidden */}
                <div 
                  className="relative rounded-[22px] overflow-hidden bg-[#060a15] aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] group/carousel"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {/* Carrossel de Fotos */}
                  {imagesList.map((imgSrc, idx) => (
                    <img
                      key={imgSrc + idx}
                      src={imgSrc}
                      alt={`Destaque Trend Dela ${idx + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.05] transition-opacity duration-1000 ease-in-out ${
                        idx === currentIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
                      }`}
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  ))}

                  {/* Controles do Carrossel (Setas Direcionais no Hover) */}
                  {imagesList.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-amber-300 border border-amber-500/30 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 cursor-pointer shadow-lg"
                        aria-label="Imagem Anterior"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-amber-300 border border-amber-500/30 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 cursor-pointer shadow-lg"
                        aria-label="Próxima Imagem"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Indicadores de Pontos (Dots) no Rodapé da Imagem */}
                      <div className="absolute bottom-20 left-0 right-0 z-20 flex items-center justify-center gap-1.5 pointer-events-auto">
                        {imagesList.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                              idx === currentIndex
                                ? 'w-5 bg-amber-400'
                                : 'w-1.5 bg-white/50 hover:bg-white/80'
                            }`}
                            aria-label={`Ir para imagem ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Vinheta Escura Suave e Brilho Dourado de Borda */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-[#050811]/30 pointer-events-none z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050811]/30 via-transparent to-transparent pointer-events-none z-10" />

                  {/* Badge Flutuante no Topo da Foto */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
                    <span className="bg-[#050811]/85 backdrop-blur-md border border-amber-400/40 text-amber-200 text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                      Coleção Exclusiva
                    </span>
                    <span className="bg-emerald-500/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      Grupo Ativo
                    </span>
                  </div>

                  {/* Card Flutuante Inferior com Informações de Achados */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#070b18]/90 backdrop-blur-md border border-amber-500/30 rounded-xl p-3.5 shadow-2xl z-20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold">
                          Radar VIP em Tempo Real
                        </div>
                        <div className="text-white text-sm font-bold font-serif-luxury">
                          Achados até 70% OFF
                        </div>
                      </div>
                      <a
                        href={whatsappGroupUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gold-button-gradient px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 flex items-center gap-1 shadow-md hover:scale-105 transition-transform"
                      >
                        <span>Acessar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* Elementos Decorativos de Fundo */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-amber-400/30 rounded-2xl -z-10 pointer-events-none hidden sm:block" />
              <div className="absolute -top-4 -right-4 w-32 h-32 border border-amber-400/20 rounded-full -z-10 pointer-events-none hidden sm:block" />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

