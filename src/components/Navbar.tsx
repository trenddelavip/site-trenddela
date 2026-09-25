import React, { useState, useEffect } from 'react';
import { CrownLogo } from './CrownLogo';
import { Instagram, Facebook, Menu, X, MessageCircle, ExternalLink } from 'lucide-react';

// Custom TikTok icon
const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.88-4.49V8.41a8.28 8.28 0 0 0 4.89 1.59V6.69z" />
  </svg>
);

interface NavbarProps {
  whatsappGroupUrl: string;
  socialLinks: {
    instagram: string;
    tiktok: string;
    facebook: string;
  };
  onOpenHowItWorks: () => void;
  onOpenContact: () => void;
  onOpenNewsletter: () => void;
  onScrollTo: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  whatsappGroupUrl,
  socialLinks,
  onOpenHowItWorks,
  onOpenContact,
  onOpenNewsletter,
  onScrollTo,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onScrollTo(sectionId);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050811]/95 backdrop-blur-md border-b border-amber-500/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-gradient-to-b from-[#050811]/90 via-[#050811]/60 to-transparent py-4 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Trend Dela com coroa dourada */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('inicio');
            }}
            className="group flex items-center transition-transform duration-200 hover:scale-[1.02]"
            aria-label="Trend Dela Página Inicial"
          >
            <CrownLogo size="sm" showTagline={false} />
          </a>

          {/* Menu de navegação para Desktop */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs tracking-[0.16em] uppercase font-medium">
            <button
              onClick={() => handleNavClick('inicio')}
              className="text-slate-300 hover:text-amber-300 transition-colors py-1 relative group cursor-pointer"
            >
              Início
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              onClick={() => handleNavClick('categorias')}
              className="text-slate-300 hover:text-amber-300 transition-colors py-1 relative group cursor-pointer"
            >
              Categorias
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              onClick={() => handleNavClick('ofertas')}
              className="text-slate-300 hover:text-amber-300 transition-colors py-1 relative group cursor-pointer flex items-center gap-1"
            >
              Ofertas
              <span className="text-[9px] px-1 py-0.2 bg-amber-500/20 border border-amber-400/40 text-amber-300 rounded font-bold">
                VIP
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHowItWorks();
              }}
              className="text-slate-300 hover:text-amber-300 transition-colors py-1 relative group cursor-pointer"
            >
              Como Funciona
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-slate-300 hover:text-amber-300 transition-colors py-1 relative group cursor-pointer"
            >
              Fale Conosco
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300 group-hover:w-full" />
            </button>
          </nav>

          {/* Área Direita: Ícones de Redes Sociais + Botão Dourado */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Ícones de redes sociais */}
            <div className="flex items-center space-x-3 text-slate-400 border-r border-slate-700/60 pr-5">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:text-amber-400 hover:bg-amber-400/10 transition-all"
                aria-label="Instagram Trend Dela"
                title="Siga no Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:text-amber-400 hover:bg-amber-400/10 transition-all"
                aria-label="TikTok Trend Dela"
                title="Siga no TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:text-amber-400 hover:bg-amber-400/10 transition-all"
                aria-label="Facebook Trend Dela"
                title="Curta no Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>

            {/* Botão Dourado no lado direito: ENTRAR NOS GRUPOS */}
            <a
              href={whatsappGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-button-gradient px-4 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase flex items-center gap-2 group shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-emerald-950 fill-emerald-900 group-hover:scale-110 transition-transform" />
              <span>Entrar nos Grupos</span>
            </a>
          </div>

          {/* Botão Mobile / Tablet Hamburger */}
          <div className="flex items-center space-x-2 lg:hidden">
            <a
              href={whatsappGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-button-gradient px-3 py-1.5 rounded-full font-bold text-[11px] tracking-wider uppercase flex items-center gap-1.5 md:hidden"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Grupos</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-amber-300 hover:bg-slate-800/60 rounded-lg transition-colors focus:outline-none cursor-pointer"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050811]/98 backdrop-blur-xl pt-24 px-6 pb-8 flex flex-col justify-between overflow-y-auto md:hidden">
          <div className="flex flex-col space-y-4 border-b border-amber-500/20 pb-6">
            <div className="text-center pb-4">
              <CrownLogo size="md" showTagline={true} />
            </div>

            <button
              onClick={() => handleNavClick('inicio')}
              className="text-left text-lg uppercase tracking-wider text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/60"
            >
              Início
            </button>

            <button
              onClick={() => handleNavClick('categorias')}
              className="text-left text-lg uppercase tracking-wider text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/60"
            >
              Categorias
            </button>

            <button
              onClick={() => handleNavClick('ofertas')}
              className="text-left text-lg uppercase tracking-wider text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/60 flex items-center justify-between"
            >
              <span>Ofertas do Radar VIP</span>
              <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded font-bold">
                AO VIVO
              </span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHowItWorks();
              }}
              className="text-left text-lg uppercase tracking-wider text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/60"
            >
              Como Funciona
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-left text-lg uppercase tracking-wider text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/60"
            >
              Fale Conosco
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenNewsletter();
              }}
              className="text-left text-sm uppercase tracking-widest text-amber-300 hover:text-amber-200 py-2 flex items-center gap-2"
            >
              <span>Receber Novidades</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="pt-4 flex flex-col space-y-4">
            <a
              href={whatsappGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full gold-button-gradient py-3.5 rounded-xl font-bold text-center uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-5 h-5 text-emerald-950 fill-emerald-900" />
              <span>Entrar nos Grupos VIP</span>
            </a>

            <div className="flex items-center justify-center space-x-6 text-slate-400 pt-2">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-amber-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-amber-400 transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-amber-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
