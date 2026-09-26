-- ============================================================================
-- SCRIPT DE CONFIGURAÇÃO DO BANCO DE DADOS SUPABASE PARA O TREND DELA
-- ============================================================================
-- Instruções:
-- 1. Acesse o seu painel em https://supabase.com
-- 2. Entre no seu projeto -> Vá no menu "SQL Editor" -> Clique em "New query"
-- 3. Cole este código completo e clique em "RUN"
-- ============================================================================

-- 1. TABELA DE CONFIGURAÇÃO DO SITE (Links, Imagens do Carrossel e Redes Sociais)
CREATE TABLE IF NOT EXISTS public.site_config (
    id TEXT PRIMARY KEY DEFAULT 'main',
    config JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso para a tabela site_config:
-- Leitura pública (qualquer visitante pode ver as configurações/links)
CREATE POLICY "Permitir leitura publica das configuracoes" 
ON public.site_config FOR SELECT 
USING (true);

-- Inserção e Atualização pública/anon (para que o Painel do Admin consiga salvar na nuvem)
CREATE POLICY "Permitir atualizacao das configuracoes" 
ON public.site_config FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Permitir alteracao das configuracoes" 
ON public.site_config FOR UPDATE 
USING (true);


-- 2. TABELA DE LEADS (Leads cadastrados no Radar VIP e Newsletter)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    whatsapp TEXT NOT NULL,
    consent_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    source TEXT DEFAULT 'Site Trend Dela',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso para a tabela leads:
-- Permitir que qualquer visitante envie seus dados (Inserção)
CREATE POLICY "Permitir insercao de leads" 
ON public.leads FOR INSERT 
WITH CHECK (true);

-- 3. BUCKET DE ARMAZENAMENTO DE IMAGENS DO CARROSSEL (Supabase Storage)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'hero-carousel', 
    'hero-carousel', 
    true, 
    10485760, 
    ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml']::text[]
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Políticas de acesso público ao bucket hero-carousel (Leitura, Upload e Deleção)
CREATE POLICY "Leitura Publica Hero Storage" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'hero-carousel');

CREATE POLICY "Upload Publico Hero Storage" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'hero-carousel');

CREATE POLICY "Delecao Publica Hero Storage" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'hero-carousel');

