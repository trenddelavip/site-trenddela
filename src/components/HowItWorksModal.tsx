import React from 'react';
import { CrownLogo } from './CrownLogo';
import { X, Search, Bell, ShoppingBag, ShieldCheck, MessageCircle, Sparkles } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappGroupUrl: string;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
  whatsappGroupUrl,
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      num: "01",
      icon: <Search className="w-5 h-5 text-amber-400" />,
      title: "Garimpo e Curadoria Especializada",
      description: "Nossa equipe rastreia diariamente milhares de produtos na Amazon, Shopee, Mercado Livre, Magalu e TikTok Shop, selecionando apenas avaliações 5 estrelas e preços justos.",
    },
    {
      num: "02",
      icon: <Bell className="w-5 h-5 text-amber-400" />,
      title: "Alertas Imediatos no Radar VIP",
      description: "Quando identificamos um erro de preço, cupom exclusivo ou produto viral em estoque, enviamos o alerta em tempo real nos grupos VIP do WhatsApp.",
    },
    {
      num: "03",
      icon: <ShoppingBag className="w-5 h-5 text-amber-400" />,
      title: "Compra Segura na Plataforma Oficial",
      description: "Você clica no link direto do achado e finaliza sua compra com segurança total diretamente no aplicativo ou site oficial da plataforma parceira.",
    },
    {
      num: "04",
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      title: "Economia Inteligente & Sem Custos",
      description: "Você nunca paga nada para participar dos nossos grupos ou receber os achados. O serviço da Trend Dela é 100% gratuito para você.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#0b1227] via-[#070b18] to-[#050811] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700/60 hover:bg-slate-800 transition-all cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-8">
          <CrownLogo size="sm" showTagline={false} />
          
          <h3 className="font-brand-cinzel font-bold text-2xl sm:text-3xl text-white uppercase tracking-wider mt-2">
            COMO FUNCIONA A <span className="gold-gradient-text">TREND DELA</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Entenda como garimpamos os melhores produtos da internet para você economizar tempo e dinheiro com muito estilo.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 rounded-2xl bg-[#0e162d] border border-amber-500/20"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center flex-shrink-0">
                {s.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-amber-400 tracking-wider">
                    PASSO {s.num}
                  </span>
                  <h4 className="text-sm font-bold text-white uppercase">
                    {s.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 text-center space-y-3">
          <a
            href={whatsappGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex gold-button-gradient px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 items-center justify-center gap-2 shadow-lg"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-950 text-emerald-950" />
            <span>Quero Entrar no Radar VIP Agora</span>
          </a>
          <div>
            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Fechar e continuar navegando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
