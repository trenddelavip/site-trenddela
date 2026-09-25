/**
 * ============================================================================
 * TREND DELA - ARQUIVO CENTRAL DE CONFIGURAÇÃO DE LINKS E DADOS
 * ============================================================================
 * 
 * Prezado(a) proprietário(a) da Trend Dela:
 * Você pode alterar todos os links oficiais (WhatsApp, Redes Sociais e Plataformas)
 * diretamente neste arquivo, ou através do botão "⚙️ Configurar Links" no rodapé do site.
 * 
 * Não há necessidade de mexer em componentes complexos:
 * Altere as constantes abaixo com os links reais da sua marca!
 */

export interface AppConfig {
  // LINK DO WHATSAPP DOS GRUPOS DO RADAR VIP
  // Substitua pelo link de convite oficial do seu grupo de WhatsApp
  whatsappGroupUrl: string;

  // LINK DE CONTATO DIRETO / SUPORTE
  whatsappSupportUrl: string;

  // REDES SOCIAIS
  socialLinks: {
    instagram: string;
    tiktok: string;
    facebook: string;
  };

  // PLATAFORMAS DE COMPRAS (Links da sua loja/perfil de afiliada em cada plataforma)
  platformLinks: {
    shopee: string;
    amazon: string;
    magalu: string;
    mercadolivre: string;
    tiktokshop: string;
  };

  // INTEGRAÇÃO DO FORMULÁRIO DE NOVIDADES (RODAPÉ)
  // Caso utilize um webhook (Make, n8n, Zapier, RD Station, Mailchimp ou Google Sheets),
  // insira o URL do endpoint abaixo. Se deixar vazio, o formulário salva localmente no navegador.
  newsletterWebhookUrl: string;

  // SENHA DE ACESSO AO PAINEL DE CONFIGURAÇÃO DE LINKS
  adminPassword?: string;

  // IMAGENS DO CARROSSEL DO DESTAQUE (HERO)
  heroImages?: string[];
}

export const DEFAULT_CONFIG: AppConfig = {
  // 👉 LINK DO WHATSAPP DOS GRUPOS DO RADAR VIP (Atualizado Oficial)
  whatsappGroupUrl: "https://wa.link/hbznsr",

  // 👉 WHATSAPP DE SUPORTE / ATENDIMENTO
  whatsappSupportUrl: "https://wa.link/hbznsr",

  // 👉 INSIRA SUAS REDES SOCIAIS AQUI:
  socialLinks: {
    instagram: "https://instagram.com/trenddela.oficial",
    tiktok: "https://tiktok.com/@trenddela",
    facebook: "https://facebook.com/trenddela.oficial",
  },

  // 👉 INSIRA SEUS LINKS DE AFILIADO OU VITRINE DAS PLATAFORMAS AQUI:
  platformLinks: {
    shopee: "https://shopee.com.br",
    amazon: "https://amazon.com.br",
    magalu: "https://magazineluiza.com.br",
    mercadolivre: "https://mercadolivre.com.br",
    tiktokshop: "https://tiktok.com",
  },

  // 👉 WEBHOOK OPCIONAL PARA CAPTURA DE LEADS (ex: Zapier, Make, n8n, RD Station):
  newsletterWebhookUrl: "",

  // 👉 SENHA DO ADMINISTRADOR PARA ACESSAR "CONFIGURAR LINKS":
  adminPassword: "Mr748197/",

  // 👉 IMAGENS DO CARROSSEL DO HERO (Google Fotos / URLs de Imagem)
  heroImages: [
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85",
  ],
};

// Categorias Oficiais
export interface CategoryItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
  sampleItems: {
    title: string;
    platform: 'Shopee' | 'Amazon' | 'Magalu' | 'Mercado Livre' | 'TikTok Shop';
    priceEst: string;
    badge: string;
  }[];
}

export const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: "beleza",
    name: "Beleza",
    subtitle: "Skincare, Maquiagem & Perfumes",
    description: "Os melhores cosméticos, produtos virais de cuidados com a pele, maquiagens de alta performance e perfumes marcantes selecionados a dedo.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    tag: "Top Cuidados",
    sampleItems: [
      { title: "Kit Skincare Sérum Ácido Hialurônico + Vit C", platform: "Amazon", priceEst: "R$ 49,90", badge: "Mais Vendido" },
      { title: "Lip Gloss Hidratante Efeito Plump Dourado", platform: "Shopee", priceEst: "R$ 24,50", badge: "Viral TikTok" },
      { title: "Óleo Reparador Capilar Miracle Glow", platform: "Magalu", priceEst: "R$ 38,90", badge: "Oferta VIP" },
    ]
  },
  {
    id: "moda",
    name: "Moda",
    subtitle: "Roupas, Calçados & Alfaiataria",
    description: "Peças elegantes, atemporais e tendências do momento. Alfaiataria moderna, vestidos confortáveis e sapatos com acabamento impecável.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    tag: "Estilo & Charme",
    sampleItems: [
      { title: "Blazer Alfaiataria Linho Chic Modelagem Estruturada", platform: "Mercado Livre", priceEst: "R$ 119,90", badge: "Tendência" },
      { title: "Vestido Midi Acetinado com Fenda Lateral", platform: "Shopee", priceEst: "R$ 69,90", badge: "Elegante" },
      { title: "Sandália Minimalista Salto Bloco Dourada", platform: "Amazon", priceEst: "R$ 89,00", badge: "Conforto" },
    ]
  },
  {
    id: "casa",
    name: "Casa",
    subtitle: "Decoração, Utensílios & Mesa Posta",
    description: "Achados funcionais e decorações requintadas que transformam o seu lar com sofisticação, praticidade e aconchego.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    tag: "Lar Aconchegante",
    sampleItems: [
      { title: "Conjunto Porta Mantimentos Herméticos Minimalistas", platform: "Amazon", priceEst: "R$ 79,90", badge: "Praticidade" },
      { title: "Luminária de Mesa Touch Dourada Sem Fio Recarregável", platform: "Shopee", priceEst: "R$ 54,90", badge: "Queridinha" },
      { title: "Difusor de Aromas Ultrassônico Efeito Fogueira", platform: "Mercado Livre", priceEst: "R$ 68,00", badge: "Viral" },
    ]
  },
  {
    id: "acessorios",
    name: "Acessórios",
    subtitle: "Bolsas, Joias & Óculos de Sol",
    description: "Semijoias banhadas a ouro, bolsas refinadas, cintos sofisticados e óculos de sol que elevam qualquer look básico a outro patamar.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    tag: "Toque Final",
    sampleItems: [
      { title: "Bolsa Estruturada Alça de Corrente Dourada Luxo", platform: "Shopee", priceEst: "R$ 74,90", badge: "Desejo" },
      { title: "Colar Pingente Letra Inicial Banhado a Ouro 18k", platform: "Mercado Livre", priceEst: "R$ 45,00", badge: "Semijoia" },
      { title: "Óculos de Sol Quadrado Retrô Proteção UV400", platform: "Amazon", priceEst: "R$ 39,90", badge: "Estilo" },
    ]
  },
  {
    id: "tecnologia",
    name: "Tecnologia",
    subtitle: "Fones, Smartwatches & Gadgets Úteis",
    description: "Dispositivos inteligentes e gadgets práticos que facilitam o seu dia a dia, trabalho, estudos e momentos de lazer.",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    tag: "Vida Conectada",
    sampleItems: [
      { title: "Fone de Ouvido Bluetooth Cancelamento de Ruído Dourado/Bege", platform: "Amazon", priceEst: "R$ 139,00", badge: "Bateria Longa" },
      { title: "Suporte Articulado de Celular para Mesa e Cama", platform: "Shopee", priceEst: "R$ 29,90", badge: "Super Útil" },
      { title: "Mini Impressora Térmica Portátil para Fotos e Etiquetas", platform: "TikTok Shop", priceEst: "R$ 59,90", badge: "Viral" },
    ]
  },
  {
    id: "tendencias",
    name: "Tendências",
    subtitle: "Achados Virais & O Que Está Bombando",
    description: "Os itens mais comentados, testados e aprovados nas redes sociais. Tudo o que você precisa ver antes de todo mundo.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    tag: "Em Alta Hoje",
    sampleItems: [
      { title: "Copo Térmico Acetinado 1200ml com Canudo e Alça", platform: "Shopee", priceEst: "R$ 49,90", badge: "#1 nas Redes" },
      { title: "Escova Secadora Modeladora Efeito Salão 5 em 1", platform: "Amazon", priceEst: "R$ 115,00", badge: "Viral" },
      { title: "Organizador de Maquiagem Giratório 360 Graus Acrílico", platform: "Magalu", priceEst: "R$ 37,50", badge: "Prático" },
    ]
  },
];

// Benefícios Oficiais (Faixa Clara)
export const BENEFITS_DATA = [
  {
    id: 1,
    title: "PRODUTOS CONFIÁVEIS",
    subtitle: "Das melhores plataformas.",
    icon: "ShieldCheck",
  },
  {
    id: 2,
    title: "PRATICIDADE",
    subtitle: "Links diretos para você comprar.",
    icon: "ExternalLink",
  },
  {
    id: 3,
    title: "TENDÊNCIAS",
    subtitle: "O que há de mais atual e desejado.",
    icon: "Sparkles",
  },
  {
    id: 4,
    title: "OFERTAS ESPECIAIS",
    subtitle: "Achados incríveis com preços imperdíveis.",
    icon: "Tag",
  },
  {
    id: 5,
    title: "TUDO EM UM SÓ LUGAR",
    subtitle: "Beleza, moda, casa, tecnologia e muito mais.",
    icon: "Grid",
  },
];
