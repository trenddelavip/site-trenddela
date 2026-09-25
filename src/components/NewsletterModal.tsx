import React, { useState } from 'react';
import { CrownLogo } from './CrownLogo';
import { X, CheckCircle2, ShieldCheck, Mail, User, Phone, AlertCircle, Loader2 } from 'lucide-react';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhookUrl?: string;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({
  isOpen,
  onClose,
  webhookUrl = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [consent, setConsent] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  // Formatador suave para número de WhatsApp do Brasil
  const handlePhoneChange = (val: string) => {
    // Permite dígitos e caracteres comuns
    const cleaned = val.replace(/\D/g, '').slice(0, 11);
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    }
    if (cleaned.length > 7) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    setWhatsapp(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validações
    if (!name.trim()) {
      setErrorMsg('Por favor, informe seu nome.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMsg('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    const cleanedPhone = whatsapp.replace(/\D/g, '');
    if (cleanedPhone.length < 10) {
      setErrorMsg('Por favor, informe um WhatsApp válido com DDD (ex: 11 99999-9999).');
      return;
    }

    if (!consent) {
      setErrorMsg('É necessário aceitar o recebimento de novidades da Trend Dela.');
      return;
    }

    setIsLoading(true);

    const leadData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: cleanedPhone,
      consentDate: new Date().toISOString(),
      source: 'Rodapé - Botão Receber Novidades',
    };

    /**
     * =========================================================================
     * PONTO DE INTEGRAÇÃO OFICIAL DO FORMULÁRIO DE CAPTURA
     * =========================================================================
     * Se você tiver uma URL de Webhook ou API (ex: Make, n8n, Zapier, RD Station,
     * Mailchimp, ActiveCampaign ou Google Sheets), configure em:
     * `src/data/config.ts` no campo `newsletterWebhookUrl`.
     */
    try {
      if (webhookUrl && webhookUrl.trim() !== '') {
        // Envio real para o serviço configurado
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(leadData),
        });

        if (!response.ok) {
          throw new Error('Falha no envio para o serviço de automação.');
        }
      } else {
        // Se ainda não foi conectado um webhook externo:
        // Armazena no localStorage do navegador para não perder o contato do usuário durante os testes
        const existingLeads = JSON.parse(localStorage.getItem('trenddela_leads') || '[]');
        existingLeads.push(leadData);
        localStorage.setItem('trenddela_leads', JSON.stringify(existingLeads));
      }

      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao processar o cadastro.';
      setErrorMsg(`${message} Por favor, tente novamente ou entre em contato pelo nosso WhatsApp.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setName('');
    setEmail('');
    setWhatsapp('');
    setSuccess(false);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-gradient-to-b from-[#0b1227] via-[#070b18] to-[#050811] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
        role="dialog"
        aria-modal="true"
      >
        {/* Botão Fechar */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700/60 hover:bg-slate-800 transition-all cursor-pointer"
          aria-label="Fechar formulário"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cabeçalho do Formulário */}
        <div className="text-center space-y-2 mb-6">
          <CrownLogo size="sm" showTagline={false} />
          
          <h3 className="font-brand-cinzel font-bold text-2xl text-white uppercase tracking-wider mt-2">
            RECEBER <span className="gold-gradient-text">NOVIDADES</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto font-normal">
            Cadastre-se para receber em primeira mão nossas seleções de achados, alertas de tendências e ofertas exclusivas.
          </p>
        </div>

        {/* Estado de Sucesso */}
        {success ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h4 className="font-brand-cinzel font-bold text-xl text-white uppercase">
                Cadastro Confirmado!
              </h4>
              <p className="text-sm text-slate-300 max-w-xs mx-auto">
                Obrigada por se cadastrar na <strong className="text-amber-300">Trend Dela</strong>. Em breve você receberá nossos achados mais desejados.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="gold-button-gradient px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 cursor-pointer shadow-lg"
              >
                Concluir
              </button>
            </div>
          </div>
        ) : (
          /* Formulário de Cadastro */
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Campo: Nome */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold uppercase tracking-wider text-amber-200/90 block">
                Nome Completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0e162d] border border-amber-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>
            </div>

            {/* Campo: E-mail */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold uppercase tracking-wider text-amber-200/90 block">
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0e162d] border border-amber-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>
            </div>

            {/* Campo: WhatsApp */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold uppercase tracking-wider text-amber-200/90 block">
                WhatsApp
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0e162d] border border-amber-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>
            </div>

            {/* Opção de Consentimento Obrigatória */}
            <div className="pt-1">
              <label className="flex items-start gap-3 cursor-pointer select-none text-left">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-amber-500/50 bg-[#0e162d] text-amber-500 focus:ring-amber-400 accent-amber-500"
                />
                <span className="text-xs text-slate-300 leading-snug">
                  Quero receber novidades, tendências e ofertas selecionadas da <strong className="text-amber-300">Trend Dela</strong>.
                </span>
              </label>
            </div>

            {/* Informação Clara sobre Privacidade (LGPD) */}
            <div className="p-3 rounded-xl bg-[#060a16] border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2 text-left">
              <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Privacidade Garantida:</strong> Seus dados serão utilizados exclusivamente para envio das comunicações da Trend Dela, conforme a Lei Geral de Proteção de Dados (LGPD). Nunca praticamos spam e você pode solicitar cancelamento a qualquer momento.
              </span>
            </div>

            {/* Botão de Envio */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full gold-button-gradient py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processando...</span>
                  </>
                ) : (
                  <span>Cadastrar e Receber Novidades</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
