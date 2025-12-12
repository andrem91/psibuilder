-- =============================================
-- PsiBuilder - Correções de Segurança e Performance
-- Resolução dos erros e warnings do Supabase Linter
-- =============================================

-- ======================
-- 1. ERROS CRÍTICOS (RLS)
-- ======================

-- Habilitar RLS na tabela content_library (estava faltando)
ALTER TABLE content_library ENABLE ROW LEVEL SECURITY;

-- ======================
-- 2. CORRIGIR FUNÇÕES (search_path)
-- ======================

-- Recriar função update_updated_at_column com search_path fixo
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recriar função handle_new_user com search_path fixo
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Criar perfil básico
    INSERT INTO public.profiles (user_id, full_name, email, whatsapp, crp)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Novo Psicólogo'),
        NEW.email,
        '',
        ''
    );
    
    -- Criar assinatura gratuita
    INSERT INTO public.subscriptions (user_id, plan, status)
    VALUES (NEW.id, 'free', 'active');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ======================
-- 3. RECRIAR POLÍTICAS RLS COM (select auth.uid())
-- Otimização de performance: evita re-avaliação por linha
-- ======================

-- === PROFILES ===
DROP POLICY IF EXISTS "Usuários podem ver seu próprio perfil" ON profiles;
DROP POLICY IF EXISTS "Usuários podem atualizar seu próprio perfil" ON profiles;
DROP POLICY IF EXISTS "Usuários podem criar seu próprio perfil" ON profiles;

CREATE POLICY "Usuários podem ver seu próprio perfil"
    ON profiles FOR SELECT
    USING ((select auth.uid()) = user_id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
    ON profiles FOR UPDATE
    USING ((select auth.uid()) = user_id);

CREATE POLICY "Usuários podem criar seu próprio perfil"
    ON profiles FOR INSERT
    WITH CHECK ((select auth.uid()) = user_id);

-- === SITES ===
DROP POLICY IF EXISTS "Sites publicados são públicos" ON sites;
DROP POLICY IF EXISTS "Usuários podem gerenciar seu site" ON sites;

-- Política única combinada para SELECT (evita múltiplas políticas permissivas)
CREATE POLICY "Acesso a sites"
    ON sites FOR SELECT
    USING (
        is_published = true 
        OR (select auth.uid()) = (SELECT user_id FROM profiles WHERE id = profile_id)
    );

-- Política para INSERT/UPDATE/DELETE
CREATE POLICY "Usuários podem gerenciar seu site"
    ON sites FOR ALL
    USING ((select auth.uid()) = (SELECT user_id FROM profiles WHERE id = profile_id));

-- === SUBSCRIPTIONS ===
DROP POLICY IF EXISTS "Usuários podem ver sua assinatura" ON subscriptions;
DROP POLICY IF EXISTS "Usuários podem gerenciar sua assinatura" ON subscriptions;

-- Política única combinada
CREATE POLICY "Acesso a assinaturas"
    ON subscriptions FOR SELECT
    USING ((select auth.uid()) = user_id);

CREATE POLICY "Usuários podem gerenciar sua assinatura"
    ON subscriptions FOR ALL
    USING ((select auth.uid()) = user_id);

-- === SITE_ANALYTICS ===
DROP POLICY IF EXISTS "Usuários podem ver analytics do seu site" ON site_analytics;

CREATE POLICY "Usuários podem ver analytics do seu site"
    ON site_analytics FOR SELECT
    USING (
        site_id IN (
            SELECT s.id FROM sites s
            JOIN profiles p ON s.profile_id = p.id
            WHERE p.user_id = (select auth.uid())
        )
    );

-- === BLOG_POSTS ===
DROP POLICY IF EXISTS "Posts publicados são públicos" ON blog_posts;
DROP POLICY IF EXISTS "Usuários podem gerenciar posts do seu site" ON blog_posts;

-- Política única combinada para SELECT
CREATE POLICY "Acesso a posts"
    ON blog_posts FOR SELECT
    USING (
        is_published = true OR
        site_id IN (
            SELECT s.id FROM sites s
            JOIN profiles p ON s.profile_id = p.id
            WHERE p.user_id = (select auth.uid())
        )
    );

-- Política para INSERT/UPDATE/DELETE
CREATE POLICY "Usuários podem gerenciar posts do seu site"
    ON blog_posts FOR ALL
    USING (
        site_id IN (
            SELECT s.id FROM sites s
            JOIN profiles p ON s.profile_id = p.id
            WHERE p.user_id = (select auth.uid())
        )
    );

-- === FAQ_ITEMS ===
DROP POLICY IF EXISTS "FAQ é público para sites publicados" ON faq_items;
DROP POLICY IF EXISTS "Usuários podem gerenciar FAQ do seu site" ON faq_items;

-- Política única combinada para SELECT
CREATE POLICY "Acesso a FAQ"
    ON faq_items FOR SELECT
    USING (
        site_id IN (SELECT id FROM sites WHERE is_published = true) OR
        site_id IN (
            SELECT s.id FROM sites s
            JOIN profiles p ON s.profile_id = p.id
            WHERE p.user_id = (select auth.uid())
        )
    );

-- Política para INSERT/UPDATE/DELETE
CREATE POLICY "Usuários podem gerenciar FAQ do seu site"
    ON faq_items FOR ALL
    USING (
        site_id IN (
            SELECT s.id FROM sites s
            JOIN profiles p ON s.profile_id = p.id
            WHERE p.user_id = (select auth.uid())
        )
    );

-- ======================
-- 4. ADICIONAR ÍNDICE FALTANTE
-- ======================

-- Índice para faq_items.site_id (foreign key)
CREATE INDEX IF NOT EXISTS idx_faq_items_site_id ON faq_items(site_id);

-- ======================
-- VERIFICAÇÃO
-- ======================
-- Após executar, rode npx supabase db lint para verificar se os warnings foram resolvidos
