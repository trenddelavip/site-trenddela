import React, { useState, useEffect } from 'react';
import { DEFAULT_CONFIG, AppConfig, CategoryItem } from './data/config';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BenefitsBar } from './components/BenefitsBar';
import { CategoriesSection } from './components/CategoriesSection';
import { PlatformsSection } from './components/PlatformsSection';
import { Footer } from './components/Footer';
import { NewsletterModal } from './components/NewsletterModal';
import { CategoryDetailModal } from './components/CategoryDetailModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { ContactModal } from './components/ContactModal';
import { LinkConfigModal } from './components/LinkConfigModal';
import { VipPopupModal } from './components/VipPopupModal';

export default function App() {
  // Estado de configuração com persistência em localStorage para facilitar edição pelo cliente
  const [config, setConfig] = useState<AppConfig>(() => {
    try {
      const saved = localStorage.getItem('trenddela_config_v2') || localStorage.getItem('trenddela_config_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Garante que o link oficial do WhatsApp seja atualizado caso esteja com o placeholder antigo
        if (
          !parsed.whatsappGroupUrl ||
          parsed.whatsappGroupUrl.includes('TrendDelaRadarVIP') ||
          parsed.whatsappGroupUrl.includes('SEU_CODIGO')
        ) {
          parsed.whatsappGroupUrl = DEFAULT_CONFIG.whatsappGroupUrl;
        }
        if (
          !parsed.whatsappSupportUrl ||
          parsed.whatsappSupportUrl.includes('999999999')
        ) {
          parsed.whatsappSupportUrl = DEFAULT_CONFIG.whatsappSupportUrl;
        }
        return { ...DEFAULT_CONFIG, ...parsed };
      }
    } catch (e) {
      console.warn('Erro ao carregar configurações salvas:', e);
    }
    return DEFAULT_CONFIG;
  });

  // Estados dos Modais
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isVipPopupOpen, setIsVipPopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);

  // Popup de abertura automática convidando para o Radar VIP
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVipPopupOpen(true);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // Manipulador para salvar configurações atualizadas
  const handleSaveConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('trenddela_config_v2', JSON.stringify(newConfig));
    } catch (e) {
      console.warn('Erro ao persistir configurações:', e);
    }
  };

  // Restaurar padrões
  const handleResetDefaults = () => {
    setConfig(DEFAULT_CONFIG);
    try {
      localStorage.removeItem('trenddela_config_v2');
      localStorage.removeItem('trenddela_config_v1');
    } catch (e) {
      console.warn('Erro ao limpar configurações:', e);
    }
  };

  // Scroll suave para seções
  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const navOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-200">
      
      {/* 2. CABEÇALHO DO SITE */}
      <Navbar
        whatsappGroupUrl={config.whatsappGroupUrl}
        socialLinks={config.socialLinks}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
        onScrollTo={handleScrollTo}
      />

      <main className="flex-1">
        {/* 3. SEÇÃO PRINCIPAL — HERO */}
        <Hero
          whatsappGroupUrl={config.whatsappGroupUrl}
          onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
          heroImages={config.heroImages}
        />

        {/* 4. SEÇÃO DE BENEFÍCIOS (Faixa Clara com os 5 benefícios) */}
        <BenefitsBar />

        {/* 5. SEÇÃO — NAVEGUE POR CATEGORIAS */}
        <CategoriesSection
          onSelectCategory={(category) => setSelectedCategory(category)}
        />

        {/* 6. SEÇÃO — NOSSAS PLATAFORMAS */}
        <PlatformsSection
          platformLinks={config.platformLinks}
        />
      </main>

      {/* 8. RODAPÉ COM A ÚNICA ALTERAÇÃO: BOTÃO DISCRETO 'RECEBER NOVIDADES' */}
      <Footer
        socialLinks={config.socialLinks}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenConfig={() => setIsConfigOpen(true)}
        onScrollTo={handleScrollTo}
      />

      {/* MODAL 7: FORMULÁRIO DISCRETO DE NOVIDADES (DISPARADO PELO RODAPÉ) */}
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
        webhookUrl={config.newsletterWebhookUrl}
      />

      {/* MODAL DE DETALHES DA CATEGORIA CLICADA */}
      <CategoryDetailModal
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
        whatsappGroupUrl={config.whatsappGroupUrl}
      />

      {/* MODAL COMO FUNCIONA */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        whatsappGroupUrl={config.whatsappGroupUrl}
      />

      {/* MODAL FALE CONOSCO */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        whatsappSupportUrl={config.whatsappSupportUrl}
      />

      {/* MODAL DE CONFIGURAÇÃO DE LINKS (PAINEL DO PROPRIETÁRIO) */}
      <LinkConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        onResetDefaults={handleResetDefaults}
        onTestVipPopup={() => setIsVipPopupOpen(true)}
      />

      {/* POPUP DE BOAS-VINDAS: CONVITE RADAR VIP AO ABRIR A PÁGINA */}
      <VipPopupModal
        isOpen={isVipPopupOpen}
        onClose={() => setIsVipPopupOpen(false)}
        whatsappGroupUrl={config.whatsappGroupUrl}
      />

    </div>
  );
}
