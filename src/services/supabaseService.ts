import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AppConfig, DEFAULT_CONFIG, LeadItem } from '../data/config';

const CONFIG_LOCAL_KEY = 'trenddela_config_v2';
const LEADS_LOCAL_KEY = 'trenddela_leads';

/**
 * Busca as configurações ativas do site.
 * Se o Supabase estiver configurado, busca do banco de dados na nuvem.
 * Tenta carregar do localStorage se falhar ou se Supabase não estiver configurado.
 */
export async function fetchAppConfig(): Promise<AppConfig> {
  // 1. Se o Supabase estiver ativado, busca a versão na nuvem
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('site_config')
        .select('config')
        .eq('id', 'main')
        .single();

      if (!error && data && data.config) {
        const remoteConfig = data.config as AppConfig;
        const merged: AppConfig = {
          ...DEFAULT_CONFIG,
          ...remoteConfig,
          platformLinks: {
            ...DEFAULT_CONFIG.platformLinks,
            ...(remoteConfig.platformLinks || {}),
          },
          socialLinks: {
            ...DEFAULT_CONFIG.socialLinks,
            ...(remoteConfig.socialLinks || {}),
          },
          heroImages: (remoteConfig.heroImages && remoteConfig.heroImages.length > 0)
            ? remoteConfig.heroImages
            : DEFAULT_CONFIG.heroImages,
        };
        // Mantém o localStorage sincronizado como cache local
        try {
          localStorage.setItem(CONFIG_LOCAL_KEY, JSON.stringify(merged));
        } catch (e) {
          console.warn('Erro ao atualizar cache local:', e);
        }
        return merged;
      }
    } catch (e) {
      console.warn('Falha ao buscar configurações no Supabase, usando fallback local:', e);
    }
  }

  // 2. Fallback: carregar do localStorage ou DEFAULT_CONFIG
  try {
    const saved = localStorage.getItem(CONFIG_LOCAL_KEY) || localStorage.getItem('trenddela_config_v1');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_CONFIG, ...parsed };
    }
  } catch (e) {
    console.warn('Erro ao ler localStorage:', e);
  }

  return DEFAULT_CONFIG;
}

/**
 * Salva as configurações atualizadas.
 * Salva tanto no Supabase (se configurado) quanto no localStorage local.
 */
export async function saveAppConfig(newConfig: AppConfig): Promise<{ success: boolean; error?: string }> {
  // 1. Atualizar localStorage imediatamente
  try {
    localStorage.setItem(CONFIG_LOCAL_KEY, JSON.stringify(newConfig));
  } catch (e) {
    console.warn('Erro ao salvar no localStorage:', e);
  }

  // 2. Se Supabase estiver ativado, persiste na nuvem para todos os usuários
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('site_config')
        .upsert({
          id: 'main',
          config: newConfig,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Erro ao salvar no Supabase:', error);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (e: any) {
      console.error('Erro ao conectar ao Supabase:', e);
      return { success: false, error: e?.message || 'Erro de conexão com o banco de dados' };
    }
  }

  return { success: true };
}

/**
 * Salva um novo Lead (Nome, E-mail, WhatsApp) capturado no formulário/modal.
 */
export async function saveLead(lead: Omit<LeadItem, 'id'>): Promise<{ success: boolean }> {
  // 1. Salvar no localStorage local como backup
  try {
    const existing: LeadItem[] = JSON.parse(localStorage.getItem(LEADS_LOCAL_KEY) || '[]');
    existing.unshift({ ...lead });
    localStorage.setItem(LEADS_LOCAL_KEY, JSON.stringify(existing));
  } catch (e) {
    console.warn('Erro ao guardar lead no localStorage:', e);
  }

  // 2. Salvar na nuvem (Supabase) se configurado
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('leads').insert({
        name: lead.name,
        email: lead.email,
        whatsapp: lead.whatsapp,
        consent_date: lead.consentDate || new Date().toISOString(),
        source: lead.source || 'Site Trend Dela',
      });
    } catch (e) {
      console.warn('Erro ao enviar lead para o Supabase:', e);
    }
  }

  return { success: true };
}

/**
 * Busca a lista completa de leads cadastrados (do Supabase ou localStorage).
 */
export async function fetchLeads(): Promise<LeadItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data.map((item: any) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          whatsapp: item.whatsapp,
          consentDate: item.consent_date || item.created_at,
          source: item.source,
        }));
      }
    } catch (e) {
      console.warn('Erro ao buscar leads no Supabase:', e);
    }
  }

  // Fallback para localStorage
  try {
    return JSON.parse(localStorage.getItem(LEADS_LOCAL_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

/**
 * Upload de imagem diretamente para o Supabase Storage (Bucket "hero-carousel")
 */
export async function uploadHeroImage(file: File): Promise<{ success: boolean; publicUrl?: string; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase não configurado. Verifique as chaves VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY na Vercel.' };
  }

  try {
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `hero_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('hero-carousel')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.error('Erro no upload para o Supabase Storage:', error);
      if (error.message.includes('not found') || error.message.includes('Bucket')) {
        return {
          success: false,
          error: 'O bucket "hero-carousel" precisa ser criado no Supabase em Storage -> Create Bucket -> "hero-carousel" (público).'
        };
      }
      return { success: false, error: error.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from('hero-carousel')
      .getPublicUrl(filePath);

    return {
      success: true,
      publicUrl: publicUrlData.publicUrl,
    };
  } catch (e: any) {
    console.error('Falha no upload:', e);
    return { success: false, error: e?.message || 'Erro inesperado durante o upload.' };
  }
}

/**
 * Exclui uma imagem do Supabase Storage se pertencer ao bucket hero-carousel
 */
export async function deleteHeroImage(publicUrl: string): Promise<{ success: boolean }> {
  if (!isSupabaseConfigured || !supabase || !publicUrl) {
    return { success: false };
  }

  try {
    if (publicUrl.includes('/storage/v1/object/public/hero-carousel/')) {
      const fileName = publicUrl.split('/hero-carousel/').pop();
      if (fileName) {
        await supabase.storage.from('hero-carousel').remove([fileName]);
      }
    }
  } catch (e) {
    console.warn('Erro ao excluir foto do Supabase Storage:', e);
  }

  return { success: true };
}

