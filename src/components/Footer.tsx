import React from 'react';
import { CrownLogo } from './CrownLogo';
import { Instagram, Facebook, Mail, ShieldCheck, Heart, Sparkles, Settings } from 'lucide-react';

// Custom TikTok icon
const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.88-4.49V8.41a8.28 8.28 0 0 0 4.89 1.59V6.69z" />
  </svg>
);

interface FooterProps {
  socialLinks: {
    instagram: string;
    tiktok: string;
    facebook: string;
  };
  onOpenNewsletter: () => void;
  onOpenHowItWorks: () => void;
  onOpenContact: () => void;
  onOpenConfig: () => void;
  onScrollTo: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  socialLinks,
  onOpenNewsletter,
  onOpenHowItWorks,
  onOpenContact,
  onOpenConfig,
  onScrollTo,
}) => {
  return (
    <footer className="relative bg-[#03050c] border-t border-amber-500/20 pt-16 pb-12 text-slate-300 overflow-hidden">
      {/* Luz ambiente dourada de fundo no rodapé */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-amber-500/5 blur-[140px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Parte Superior do Rodapé */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80 items-start">
          
          {/* Coluna 1: Logotipo Trend Dela + Slogan Oficial (5 colunas) */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <CrownLogo size="md" showTagline={true} />

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed pt-2">
              <strong className="text-amber-200">ACHADOS SELECIONADOS, DESCOBERTAS QUE ENCANTAM.</strong>
              <br />
              A sua curadoria definitiva de tendências, produtos inteligentes e ofertas imperdíveis das maiores plataformas.
            </p>

            {/* Redes Sociais no Rodapé */}
            <div className="flex items-center space-x-3 pt-2 text-slate-400">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#0a1024] border border-amber-500/30 flex items-center justify-center hover:text-amber-400 hover:border-amber-400/80 transition-colors"
                aria-label="Instagram Trend Dela"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#0a1024] border border-amber-500/30 flex items-center justify-center hover:text-amber-400 hover:border-amber-400/80 transition-colors"
                aria-label="TikTok Trend Dela"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#0a1024] border border-amber-500/30 flex items-center justify-center hover:text-amber-400 hover:border-amber-400/80 transition-colors"
                aria-label="Facebook Trend Dela"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Links de Navegação (4 colunas) */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300 font-brand-cinzel">
              Navegação
            </span>
            <ul className="space-y-2 text-xs uppercase tracking-wider text-slate-400">
              <li>
                <button
                  onClick={() => onScrollTo('inicio')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('categorias')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Categorias
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('ofertas')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Radar VIP de Ofertas
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenHowItWorks}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Como Funciona
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Fale Conosco
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: A ÚNICA ALTERAÇÃO SOLICITADA — BOTÃO DISCRETO NO RODAPÉ (3 colunas) */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left space-y-3 p-5 rounded-2xl bg-[#080d1e] border border-amber-500/25 shadow-lg">
            <div className="flex items-center gap-2 text-amber-300">
              <Mail className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-[0.16em]">
                Fique Conectada
              </span>
            </div>
            
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Deseja receber achados e seleções exclusivas diretamente no seu e-mail ou WhatsApp?
            </p>

            {/* BOTÃO DISCRETO NO RODAPÉ: RECEBER NOVIDADES */}
            <button
              onClick={onOpenNewsletter}
              id="botao-receber-novidades-rodape"
              className="w-full gold-button-secondary py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md group"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>RECEBER NOVIDADES</span>
            </button>

            <span className="text-[10px] text-slate-500 flex items-center gap-1 mx-auto md:mx-0">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              Privacidade 100% garantida pela LGPD
            </span>
          </div>

        </div>

        {/* Parte Inferior: Frase de Encerramento e Direitos */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="text-center sm:text-left">
            <p>© {new Date().getFullYear()} Trend Dela. Todos os direitos reservados.</p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Achados Selecionados, Descobertas que Encantam.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenHowItWorks}
              className="hover:text-amber-400 transition-colors cursor-pointer text-[11px]"
            >
              Termos de Uso
            </button>
            <span>·</span>
            <button
              onClick={onOpenHowItWorks}
              className="hover:text-amber-400 transition-colors cursor-pointer text-[11px]"
            >
              Política de Privacidade
            </button>
            <span>·</span>
            {/* Botão de Configuração de Links para o proprietário */}
            <button
              onClick={onOpenConfig}
              className="hover:text-amber-400 transition-colors cursor-pointer text-[11px] flex items-center gap-1 text-amber-400/70"
              title="Configurar links oficiais (WhatsApp, redes, plataformas)"
            >
              <Settings className="w-3 h-3" />
              <span>Configurar Links</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
