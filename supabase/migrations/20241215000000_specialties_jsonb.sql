-- =============================================
-- Migração: Especialidades com ícones e descrição
-- Data: 2024-12-15
-- 
-- Converte specialties de TEXT[] para JSONB
-- Estrutura: [{name, description, icon}]
-- =============================================

-- Adicionar nova coluna JSONB
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS specialties_data JSONB DEFAULT '[]'::jsonb;

-- Migrar dados existentes (converte TEXT[] para JSONB)
UPDATE profiles 
SET specialties_data = (
    SELECT COALESCE(
        jsonb_agg(
            jsonb_build_object(
                'name', elem,
                'description', '',
                'icon', 'heart'
            )
        ),
        '[]'::jsonb
    )
    FROM unnest(specialties) AS elem
)
WHERE specialties IS NOT NULL AND array_length(specialties, 1) > 0;

-- Remover coluna antiga (comentado para segurança - executar manualmente após verificar)
-- ALTER TABLE profiles DROP COLUMN specialties;

-- Renomear nova coluna (comentado - executar manualmente após verificar)
-- ALTER TABLE profiles RENAME COLUMN specialties_data TO specialties;

-- Criar índice para buscas
CREATE INDEX IF NOT EXISTS idx_profiles_specialties_data ON profiles USING GIN (specialties_data);
