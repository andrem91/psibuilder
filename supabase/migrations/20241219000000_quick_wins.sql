-- =============================================
-- Quick Wins Migration
-- Data: Dezembro 2024
-- 
-- Adiciona campos para:
-- 1. Gênero (para personalizar nomenclatura)
-- 2. Título Profissional (customizado)
-- 3. Redes Sociais (JSONB flexível)
-- =============================================

-- 1. Campo de Gênero
-- Usado para personalizar "Psicólogo" / "Psicóloga" / "Profissional de Psicologia"
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS gender TEXT DEFAULT 'not_specified' 
CHECK (gender IN ('male', 'female', 'other', 'not_specified'));

-- 2. Título Profissional (opcional)
-- Ex: "Psicóloga Clínica", "Neuropsicólogo", "Psicoterapeuta"
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS professional_title TEXT DEFAULT '';

-- 3. Redes Sociais (JSONB)
-- Formato: [{"network": "instagram", "url": "https://..."}, ...]
-- Redes suportadas: instagram, linkedin, facebook, tiktok, youtube, twitter
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '[]'::jsonb;

-- Índice para buscas em social_links (opcional, para futuro)
CREATE INDEX IF NOT EXISTS idx_profiles_social_links ON profiles USING GIN (social_links);

-- =============================================
-- FIM DA MIGRATION
-- =============================================
