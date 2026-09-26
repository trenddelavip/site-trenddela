import { createClient } from '@supabase/supabase-js';

const url = 'https://buqqwblupvlikshzdoba.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1cXF3Ymx1cHZsaWtzaHpkb2JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAzODAzNDksImV4cCI6MjEwNTk1NjM0OX0.i9TCFfiaPrEPOWpFSjPbw39LSV5EqeF5mYAEYJ_2Xzs';

const supabase = createClient(url, anonKey);

const DEFAULT_CONFIG = {
  whatsappGroupUrl: "https://wa.link/hbznsr",
  whatsappSupportUrl: "https://wa.link/hbznsr",
  socialLinks: {
    instagram: "https://instagram.com/trenddela.oficial",
    tiktok: "https://tiktok.com/@trenddela",
    facebook: "https://facebook.com/trenddela.oficial",
  },
  platformLinks: {
    shopee: "https://shopee.com.br",
    amazon: "https://amazon.com.br",
    magalu: "https://magazineluiza.com.br",
    mercadolivre: "https://mercadolivre.com.br",
    tiktokshop: "https://tiktok.com",
    shein: "https://shein.com.br",
    temu: "https://temu.com",
    aliexpress: "https://pt.aliexpress.com",
  },
  newsletterWebhookUrl: "",
  adminPassword: "Mr748197/",
  heroImages: [
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85",
  ],
};

async function seed() {
  console.log('🔄 Verificando conexão e alimentando o Supabase com as configurações padrão...');
  
  // 1. Tentar salvar site_config
  const { data, error } = await supabase
    .from('site_config')
    .upsert({
      id: 'main',
      config: DEFAULT_CONFIG,
      updated_at: new Date().toISOString()
    })
    .select();

  if (error) {
    console.error('❌ Erro no site_config:', error.message);
    if (error.message.includes('table') || error.message.includes('schema')) {
      console.log('⚠️ A tabela public.site_config ainda não existe no Supabase. É necessário executar o script SQL no SQL Editor do Supabase!');
    }
  } else {
    console.log('✅ Configuração gravada e sincronizada com sucesso no Supabase!', data);
  }

  // 2. Verificar se tabela leads existe
  const { error: leadsErr } = await supabase.from('leads').select('*').limit(1);
  if (leadsErr) {
    console.error('❌ Erro na tabela leads:', leadsErr.message);
  } else {
    console.log('✅ Tabela leads pronta para receber cadastros dos clientes!');
  }
}

seed();
