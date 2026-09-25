import React, { useEffect, useState } from 'react';
import { X, Sparkles, MessageCircle, ArrowRight, ShieldCheck, Flame, BellRing, Clock } from 'lucide-react';
import { RadarVipEmblem } from './RadarVipEmblem';

interface VipPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappGroupUrl: string;
}

// 1 hora, 27 minutos e 33 segundos = 5253 segundos
const INITIAL_TIMER_SECONDS = 1 * 3600 + 27 * 60 + 33;

export const VipPopupModal: React.FC<VipPopupModalProps> = ({
  isOpen,
  onClose,
  whatsappGroupUrl,
}) => {
  const [animateIn, setAnimateIn] = useState(false);

  // Timer regressivo começando em 1:27:33
  const [secondsLeft, setSecondsLeft] = useState<number>(() => {
    try {
      const storedTarget = sessionStorage.getItem('trenddela_vip_timer_target');
      if (storedTarget) {
        const remaining = Math.max(0, Math.floor((parseInt(storedTarget, 10) - Date.now()) / 1000));
        if (remaining > 0) return remaining;
      }
      const targetTime = Date.now() + INITIAL_TIMER_SECONDS * 1000;
      sessionStorage.setItem('trenddela_vip_timer_target', targetTime.toString());
      return INITIAL_TIMER_SECONDS;
    } catch {
      return INITIAL_TIMER_SECONDS;
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;
  const pad = (val: number) => val.toString().padStart(2, '0');

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setAnimateIn(true), 50);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
    }
  }, [isOpen]);

  // Fechar com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleJoinGroup = () => {
    window.open(whatsappGroupUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto overscroll-contain transition-all duration-300 ${
        animateIn ? 'opacity-100' : 'opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="vip-popup-title"
    >
      {/* Backdrop escuro com efeito blur luxuoso - fecha ao clicar */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity -z-10"
        onClick={onClose}
      />

      {/* Container de centralização flex com min-h-full que previne corte em qualquer tablet ou celular */}
      <div className="min-h-full flex items-center justify-center p-2 sm:p-3 md:p-4 text-center">
        {/* Conteúdo do Card Modal com borda dourada e sombra profunda */}
        <div
          className={`relative w-full max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto bg-[#070c1a] border-2 border-amber-400/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 text-center shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_50px_rgba(212,175,55,0.25)] my-auto transition-all duration-300 transform ${
            animateIn ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-2 opacity-0'
          }`}
        >
          {/* Efeito de iluminação dourada no topo */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-32 bg-gradient-to-b from-amber-400/30 via-amber-600/10 to-transparent blur-3xl pointer-events-none" />

          {/* Botão de Fechar fixado no canto superior */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900/90 border border-slate-700/60 text-slate-400 hover:text-white hover:border-amber-400/60 hover:bg-slate-800 transition-all flex items-center justify-center cursor-pointer z-30 shadow-md"
            aria-label="Fechar popup"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Seção 1: Frase de Escassez e Timer Regressivo */}
          <div className="flex flex-col items-center gap-1 sm:gap-1.5 mb-2 pt-0.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-amber-500/25 via-red-500/20 to-amber-600/25 border border-amber-400/80 text-amber-200 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-md text-center max-w-[92%]">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping flex-shrink-0" />
              <span className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-tight truncate sm:text-clip">
                Últimas vagas desse lote. Veja se ainda dá tempo!
              </span>
            </div>

            {/* Timer Regressivo em Grande Destaque (Inicia em 1:27:33) */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-xl bg-[#040816] border border-amber-400/70 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 animate-pulse flex-shrink-0" />
              <span className="text-[9px] sm:text-[11px] uppercase tracking-widest text-slate-300 font-bold">
                Tempo Restante:
              </span>
              <div className="flex items-center gap-1 font-mono text-xs sm:text-sm font-black tracking-wider">
                <div className="flex flex-col items-center">
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/25 border border-amber-400/50 text-amber-300 shadow-inner leading-none">
                    {pad(hours)}
                  </span>
                  <span className="text-[6px] sm:text-[7px] text-slate-400 font-sans tracking-normal uppercase mt-0.5">horas</span>
                </div>
                <span className="text-amber-400 font-bold -mt-2 animate-pulse">:</span>
                <div className="flex flex-col items-center">
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/25 border border-amber-400/50 text-amber-300 shadow-inner leading-none">
                    {pad(minutes)}
                  </span>
                  <span className="text-[6px] sm:text-[7px] text-slate-400 font-sans tracking-normal uppercase mt-0.5">min</span>
                </div>
                <span className="text-amber-400 font-bold -mt-2 animate-pulse">:</span>
                <div className="flex flex-col items-center">
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/25 border border-amber-400/50 text-amber-200 shadow-inner leading-none">
                    {pad(seconds)}
                  </span>
                  <span className="text-[6px] sm:text-[7px] text-slate-400 font-sans tracking-normal uppercase mt-0.5">seg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Emblema Radar VIP (escala super compacta e refinada) */}
          <div className="flex justify-center mb-1 transform scale-75 sm:scale-85 md:scale-90 origin-center -my-1.5">
            <RadarVipEmblem />
          </div>

          {/* Título Principal */}
          <h3
            id="vip-popup-title"
            className="font-brand-cinzel font-black text-lg sm:text-xl md:text-2xl text-white uppercase tracking-wider mb-1 leading-tight"
          >
            ACESSO AO <span className="gold-gradient-text">GRUPO VIP</span>
          </h3>

          {/* Subtítulo persuasivo */}
          <p className="text-[10px] sm:text-[11px] md:text-xs text-slate-300 max-w-sm mx-auto mb-2 leading-relaxed">
            Receba em tempo real os melhores achados da internet com até <strong className="text-amber-300 font-semibold">70% de desconto</strong>, cupons secretos e links diretos verificados.
          </p>

          {/* 3 Benefícios rápidos compactos */}
          <div className="bg-[#0b1226]/80 border border-amber-400/20 rounded-xl p-2 sm:p-2.5 mb-2 text-left space-y-1">
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-200">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center flex-shrink-0">
                <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
              </div>
              <span className="truncate sm:text-clip"><strong>Ofertas Relâmpago</strong> garimpadas antes que esgotem</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-200">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
              </div>
              <span className="truncate sm:text-clip"><strong>Lojas Oficiais:</strong> Amazon, Shopee, Mercado Livre e Shein</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-200">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center flex-shrink-0">
                <BellRing className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
              </div>
              <span className="truncate sm:text-clip"><strong>Grupo Silencioso:</strong> Sem conversas paralelas nem spam</span>
            </div>
          </div>

          {/* Aviso de Capacidade Crítica */}
          <div className="mb-2 px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center gap-1.5 text-[9px] sm:text-[10px] text-amber-200 font-medium">
            <Flame className="w-3 h-3 text-amber-400 animate-pulse flex-shrink-0" />
            <span><strong>Grupo quase lotado:</strong> garanta sua vaga antes do encerramento!</span>
          </div>

          {/* Botão de Ação Principal (CTA) */}
          <button
            type="button"
            onClick={handleJoinGroup}
            className="w-full gold-button-gradient py-2.5 sm:py-3 px-4 rounded-xl font-brand-cinzel font-black text-xs sm:text-sm uppercase tracking-wider text-slate-950 flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_12px_28px_rgba(212,175,55,0.6)] transform hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer group"
          >
            <MessageCircle className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform fill-slate-950/20 flex-shrink-0" />
            <span className="truncate">ENTRAR NO GRUPO ANTES QUE ESGOTE</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </button>

          {/* Micro Prova e Botão de Dispensar */}
          <div className="mt-2 flex flex-col items-center gap-0.5">
            <span className="text-[9px] sm:text-[10px] text-amber-200/80 font-medium">
              🔒 100% Gratuito · Saia quando quiser com 1 clique
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-[10px] sm:text-[11px] text-slate-400 hover:text-slate-200 transition-colors underline underline-offset-4 cursor-pointer pt-0.5"
            >
              Continuar navegando no site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
