import React, { useState } from 'react';
import { CrownLogo } from './CrownLogo';
import { X, MessageCircle, Mail, Send, CheckCircle2, Clock } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappSupportUrl: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  whatsappSupportUrl,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Dúvida sobre achados / produtos');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSent(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-gradient-to-b from-[#0b1227] via-[#070b18] to-[#050811] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700/60 hover:bg-slate-800 transition-all cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <CrownLogo size="sm" showTagline={false} />
          
          <h3 className="font-brand-cinzel font-bold text-2xl sm:text-3xl text-white uppercase tracking-wider mt-2">
            FALE <span className="gold-gradient-text">CONOSCO</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
            Dúvidas, parcerias ou sugestões? Nossa equipe está à disposição para te atender com toda elegância e atenção.
          </p>
        </div>

        {/* Botão de Atendimento Imediato pelo WhatsApp */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
                Atendimento Rápido via WhatsApp
              </h4>
              <p className="text-[11px] text-slate-300">
                Segunda a Sexta, das 09h às 18h
              </p>
            </div>
          </div>

          <a
            href={whatsappSupportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-xl tracking-wider transition-colors whitespace-nowrap text-center"
          >
            Chamar no WhatsApp
          </a>
        </div>

        {sent ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-brand-cinzel font-bold text-lg text-white">
              Mensagem Enviada!
            </h4>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Recebemos sua mensagem com sucesso. Responderemos em breve no e-mail informado.
            </p>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="gold-button-gradient px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 cursor-pointer"
              >
                Concluir
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold uppercase text-amber-200/90 block">
                Nome
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e162d] border border-amber-500/30 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold uppercase text-amber-200/90 block">
                E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e162d] border border-amber-500/30 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold uppercase text-amber-200/90 block">
                Assunto
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e162d] border border-amber-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="Dúvida sobre achados / produtos">Dúvida sobre achados / produtos</option>
                <option value="Parceria / Anúncio">Parcerias e Divulgações</option>
                <option value="Suporte do Radar VIP">Suporte do Radar VIP</option>
                <option value="Outro assunto">Outro assunto</option>
              </select>
            </div>

            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold uppercase text-amber-200/90 block">
                Mensagem
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Como podemos te ajudar hoje?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e162d] border border-amber-500/30 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full gold-button-gradient py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Mensagem</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
