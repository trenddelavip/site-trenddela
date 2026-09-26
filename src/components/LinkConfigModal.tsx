import React, { useState, useEffect } from 'react';
import { AppConfig, DEFAULT_CONFIG } from '../data/config';
import { X, Check, Copy, Link as LinkIcon, Sparkles, MessageCircle, RefreshCw, Lock, KeyRound, ShieldCheck, Eye, EyeOff, LogOut, Image, Plus, Trash2, Users, FileSpreadsheet, Search } from 'lucide-react';

interface LinkConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  onSaveConfig: (newConfig: AppConfig) => void;
  onResetDefaults: () => void;
  onTestVipPopup?: () => void;
}

interface LeadItem {
  name: string;
  email: string;
  whatsapp: string;
  consentDate: string;
  source?: string;
}

export const LinkConfigModal: React.FC<LinkConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onResetDefaults,
  onTestVipPopup,
}) => {
  const [formData, setFormData] = useState<AppConfig>(() => ({
    ...config,
    platformLinks: {
      ...DEFAULT_CONFIG.platformLinks,
      ...config.platformLinks,
    },
    heroImages: (config.heroImages && config.heroImages.length > 0)
      ? config.heroImages
      : (DEFAULT_CONFIG.heroImages || []),
  }));
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Autenticação por senha
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('trenddela_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Estado de Leads Capturados
  const [leadsList, setLeadsList] = useState<LeadItem[]>([]);
  const [leadSearchTerm, setLeadSearchTerm] = useState('');

  useEffect(() => {
    setFormData({
      ...config,
      platformLinks: {
        ...DEFAULT_CONFIG.platformLinks,
        ...config.platformLinks,
      },
      heroImages: (config.heroImages && config.heroImages.length > 0)
        ? config.heroImages
        : (DEFAULT_CONFIG.heroImages || []),
    });

    if (isOpen && isAuthenticated) {
      try {
        const saved = JSON.parse(localStorage.getItem('trenddela_leads') || '[]');
        setLeadsList(saved);
      } catch (e) {
        console.warn('Erro ao carregar leads:', e);
      }
    }
  }, [config, isOpen, isAuthenticated]);

  const handleExportLeadsCSV = () => {
    if (leadsList.length === 0) {
      alert('Nenhum lead cadastrado ainda para exportar.');
      return;
    }

    const headers = ['Nome', 'E-mail', 'WhatsApp', 'Data de Cadastro', 'Origem'];
    const rows = leadsList.map(l => [
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${l.whatsapp}"`,
      `"${new Date(l.consentDate).toLocaleString('pt-BR')}"`,
      `"${l.source || 'Formulário do Site'}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_trenddela_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearLeads = () => {
    if (confirm('Tem certeza que deseja limpar a lista de leads cadastrados? Recomendamos exportar para Excel antes.')) {
      localStorage.removeItem('trenddela_leads');
      setLeadsList([]);
    }
  };

  if (!isOpen) return null;

  const targetPassword = config.adminPassword || 'Mr748197/';

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === targetPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('trenddela_admin_auth', 'true');
      setPasswordError(false);
      setPasswordInput('');
    } else {
      setPasswordError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('trenddela_admin_auth');
    setPasswordInput('');
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
        <div
          className="relative w-full max-w-md bg-gradient-to-b from-[#0b1227] via-[#070b18] to-[#050811] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] text-left"
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

          <div className="flex flex-col items-center text-center space-y-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                Área Restrita do Administrador
              </span>
              <h3 className="font-brand-cinzel font-bold text-xl text-white uppercase tracking-wider">
                Senha de <span className="gold-gradient-text">Acesso</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Digite a senha para acessar a configuração dos links oficiais.
              </p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                Senha do Administrador
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (passwordError) setPasswordError(false);
                  }}
                  placeholder="Digite a senha..."
                  autoFocus
                  className="w-full pl-10 pr-10 py-3 bg-slate-950/80 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="text-xs text-red-400 mt-2 flex items-center gap-1 font-medium animate-in fade-in">
                  <span>⚠️ Senha incorreta! Tente novamente.</span>
                </p>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 gold-button-gradient py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 flex items-center justify-center gap-2 shadow-md cursor-pointer hover:opacity-95 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Acessar Painel</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#0b1227] via-[#070b18] to-[#050811] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            type="button"
            onClick={handleLogout}
            className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-300 hover:text-white border border-red-500/30 hover:bg-red-500/20 text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer"
            title="Sair / Bloquear Painel"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700/60 hover:bg-slate-800 transition-all cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1 mb-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Painel do Administrador</span>
          </div>
          <h3 className="font-brand-cinzel font-bold text-2xl text-white uppercase tracking-wider">
            CONFIGURAÇÃO DE <span className="gold-gradient-text">LINKS OFICIAIS</span>
          </h3>
          <p className="text-xs text-slate-300">
            Gerencie os links oficiais do seu site (WhatsApp, redes sociais e plataformas de compras).
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6 text-left">
          
          {/* SEÇÃO PRINCIPAL: LINK DO WHATSAPP DO RADAR VIP */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-400/60 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>LINK DO WHATSAPP (RADAR VIP DE OFERTAS) *</span>
              </label>
              <span className="text-[10px] text-amber-200/90 font-bold bg-amber-400/20 px-2 py-0.5 rounded">
                Destaque Principal
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Insira o link de convite do seu grupo de WhatsApp. Esse link será acionado pelo botão principal da Seção Hero e pelo menu do topo.
            </p>
            <input
              type="url"
              required
              value={formData.whatsappGroupUrl}
              onChange={(e) => setFormData({ ...formData, whatsappGroupUrl: e.target.value })}
              placeholder="https://wa.link/hbznsr"
              className="w-full px-3.5 py-3 rounded-xl bg-[#070b16] border border-amber-400 text-amber-100 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {onTestVipPopup && (
              <div className="pt-1 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onTestVipPopup();
                  }}
                  className="text-[11px] font-bold text-amber-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Testar Popup VIP de Entrada na tela</span>
                </button>
              </div>
            )}
          </div>

          {/* CARROSSEL DE IMAGENS DO HERO (DESTAQUE) */}
          <div className="p-4 rounded-2xl bg-[#080d1e] border border-amber-500/30 text-left space-y-3">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Image className="w-4 h-4 text-amber-400" />
                <span>Carrossel de Imagens do Destaque (Hero)</span>
              </h4>
              <span className="text-[10px] text-amber-200/90 font-semibold bg-amber-400/15 px-2 py-0.5 rounded">
                {(formData.heroImages || []).length} imagem(ns)
              </span>
            </div>
            
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Adicione links diretos de imagens (incluindo <strong>Google Fotos</strong>, Unsplash ou URLs de imagens hospedadas). O carrossel alternará automaticamente entre essas imagens.
            </p>

            {/* Dica para Google Fotos */}
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-200 leading-normal">
              💡 <strong>Como usar links do Google Fotos:</strong> No Google Fotos, abra a foto desejada, clique com o botão direito sobre ela e escolha <em>"Copiar endereço da imagem"</em>. Cole o link no campo abaixo.
            </div>

            <div className="space-y-2 pt-1">
              {(formData.heroImages || []).map((imgUrl, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 w-5 text-center">
                    #{index + 1}
                  </span>
                  <input
                    type="url"
                    value={imgUrl}
                    onChange={(e) => {
                      const newImages = [...(formData.heroImages || [])];
                      newImages[index] = e.target.value;
                      setFormData({ ...formData, heroImages: newImages });
                    }}
                    placeholder="https://images.unsplash.com/... ou link direto do Google Fotos"
                    className="flex-1 px-3 py-2 rounded-xl bg-[#050811] border border-slate-700 text-white text-xs font-mono focus:border-amber-400 focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = (formData.heroImages || []).filter((_, i) => i !== index);
                      setFormData({ ...formData, heroImages: newImages });
                    }}
                    disabled={(formData.heroImages || []).length <= 1}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title="Remover imagem"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  const newImages = [...(formData.heroImages || []), ''];
                  setFormData({ ...formData, heroImages: newImages });
                }}
                className="w-full py-2.5 rounded-xl border border-dashed border-amber-500/40 text-amber-300 hover:bg-amber-400/10 hover:border-amber-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Nova Imagem ao Carrossel</span>
              </button>
            </div>
          </div>

          {/* REDES SOCIAIS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-1">
              Redes Sociais Oficiais
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 uppercase font-medium block mb-1">
                  Instagram
                </label>
                <input
                  type="text"
                  value={formData.socialLinks.instagram}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0e162d] border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 uppercase font-medium block mb-1">
                  TikTok
                </label>
                <input
                  type="text"
                  value={formData.socialLinks.tiktok}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, tiktok: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0e162d] border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 uppercase font-medium block mb-1">
                  Facebook
                </label>
                <input
                  type="text"
                  value={formData.socialLinks.facebook}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, facebook: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0e162d] border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* PLATAFORMAS DE COMPRAS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-1">
              Links de Vitrine / Afiliada das Plataformas
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 uppercase font-medium block mb-1">
                  Shopee
                </label>
                <input
                  type="text"
                  value={formData.platformLinks.shopee}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      platformLinks: { ...formData.platformLinks, shopee: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0e162d] border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 uppercase font-medium block mb-1">
                  Amazon
                </label>
                <input
                  type="text"
                  value={formData.platformLinks.amazon}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      platformLinks: { ...formData.platformLinks, amazon: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0e162d] border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 uppercase font-medium block mb-1">
                  Magalu
                </label>
                <input
                  type="text"
                  value={formData.platformLinks.magalu}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      platformLinks: { ...formData.platformLinks, magalu: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0e162d] border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 uppercase font-medium block mb-1">
                  Mercado Livre
                </label>
                <input
                  type="text"
                  value={formData.platformLinks.mercadolivre}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      platformLinks: { ...formData.platformLinks, mercadolivre: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0e162d] border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 uppercase font-medium block mb-1">
                  TikTok Shop
                </label>
                <input
                  type="text"
                  value={formData.platformLinks.tiktokshop}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      platformLinks: { ...formData.platformLinks, tiktokshop: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0e162d] border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 uppercase font-medium block mb-1">
                  Shein
                </label>
                <input
                  type="text"
                  value={formData.platformLinks.shein || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      platformLinks: { ...formData.platformLinks, shein: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0e162d] border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 uppercase font-medium block mb-1">
                  Temu
                </label>
                <input
                  type="text"
                  value={formData.platformLinks.temu || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      platformLinks: { ...formData.platformLinks, temu: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0e162d] border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 uppercase font-medium block mb-1">
                  AliExpress
                </label>
                <input
                  type="text"
                  value={formData.platformLinks.aliexpress || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      platformLinks: { ...formData.platformLinks, aliexpress: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0e162d] border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* SEÇÃO: LEADS E CONTATOS CAPTURADOS */}
          <div className="p-4 rounded-2xl bg-[#091126] border-2 border-emerald-500/40 text-left space-y-3 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/20 pb-2.5">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Leads & Contatos Capturados
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Clientes que preencheram o formulário "Receber Novidades" no site.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
                  {leadsList.length} contato(s)
                </span>
                <button
                  type="button"
                  onClick={handleExportLeadsCSV}
                  disabled={leadsList.length === 0}
                  className="gold-button-gradient px-3.5 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Exportar Excel (CSV)</span>
                </button>
              </div>
            </div>

            {leadsList.length > 0 && (
              <div className="pt-1 space-y-2">
                {/* Campo de Busca de Leads */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={leadSearchTerm}
                    onChange={(e) => setLeadSearchTerm(e.target.value)}
                    placeholder="Buscar lead por nome, e-mail ou WhatsApp..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#050811] border border-slate-700 text-white text-xs focus:border-emerald-400 focus:outline-none"
                  />
                </div>

                {/* Tabela de Leads */}
                <div className="max-h-52 overflow-y-auto rounded-xl border border-slate-800 bg-[#050811]">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#0b1328] text-[10px] uppercase font-bold text-emerald-300 sticky top-0 border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">Nome</th>
                        <th className="p-2.5">E-mail</th>
                        <th className="p-2.5">WhatsApp</th>
                        <th className="p-2.5 text-right">Data</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                      {leadsList
                        .filter((l) =>
                          `${l.name} ${l.email} ${l.whatsapp}`
                            .toLowerCase()
                            .includes(leadSearchTerm.toLowerCase())
                        )
                        .map((lead, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                            <td className="p-2.5 font-sans font-semibold text-white">{lead.name}</td>
                            <td className="p-2.5 text-slate-300">{lead.email}</td>
                            <td className="p-2.5">
                              <a
                                href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-400 hover:underline font-bold flex items-center gap-1"
                                title="Abrir conversa no WhatsApp"
                              >
                                <span>{lead.whatsapp}</span>
                              </a>
                            </td>
                            <td className="p-2.5 text-right text-slate-400 text-[10px]">
                              {new Date(lead.consentDate).toLocaleDateString('pt-BR')}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>💡 Clique sobre o número do WhatsApp para iniciar a conversa direto no WhatsApp.</span>
                  <button
                    type="button"
                    onClick={handleClearLeads}
                    className="text-red-400 hover:underline cursor-pointer"
                  >
                    Limpar lista
                  </button>
                </div>
              </div>
            )}

            {leadsList.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-3 italic">
                Nenhum cliente cadastrado ainda. Os novos contatos aparecerão aqui automaticamente.
              </p>
            )}
          </div>

          {/* WEBHOOK URL DO FORMULÁRIO DE NOVIDADES */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-1">
              Integração de E-mails / Leads (Webhook Opcional)
            </h4>
            <p className="text-[11px] text-slate-400">
              Cole abaixo a URL do Webhook do seu serviço (ex: Make, n8n, Zapier, RD Station, Mailchimp ou Google Sheets) para receber os contatos cadastrados pelo botão do rodapé:
            </p>
            <input
              type="text"
              value={formData.newsletterWebhookUrl}
              onChange={(e) => setFormData({ ...formData, newsletterWebhookUrl: e.target.value })}
              placeholder="https://hook.us1.make.com/sua-url-de-webhook"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e162d] border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none font-mono"
            />
          </div>

          {/* ALTERAÇÃO DE SENHA DO ADMINISTRADOR */}
          <div className="p-4 rounded-2xl bg-[#0b1227] border border-amber-500/20 text-left space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 border-b border-amber-500/20 pb-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Senha do Administrador</span>
            </h4>
            <p className="text-[11px] text-slate-300">
              Altere a senha de proteção do botão "Configurar Links" (senha padrão: <code className="text-amber-300 font-mono bg-amber-500/10 px-1 py-0.5 rounded">Mr748197/</code>):
            </p>
            <div className="relative max-w-sm">
              <input
                type="text"
                value={formData.adminPassword || 'Mr748197/'}
                onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                placeholder="Ex: Mr748197/"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e162d] border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onResetDefaults}
              className="text-xs text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restaurar Padrões</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="w-1/2 sm:w-auto gold-button-gradient px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Salvo com Sucesso!</span>
                  </>
                ) : (
                  <span>Salvar Alterações</span>
                )}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
