-- =============================================
-- Correção final: Separar políticas SELECT de INSERT/UPDATE/DELETE
-- =============================================

-- === SITES ===
DROP POLICY IF EXISTS "Acesso a sites" ON sites;
DROP POLICY IF EXISTS "Usuários podem gerenciar seu site" ON sites;

-- Apenas SELECT (leitura pública + próprio usuário)
CREATE POLICY "Acesso a sites"
    ON sites FOR SELECT
    USING (
        is_published = true 
        OR (select auth.uid()) = (SELECT user_id FROM profiles WHERE id = profile_id)
    );

-- Apenas INSERT (criação)
CREATE POLICY "Usuários podem criar site"
    ON sites FOR INSERT
    WITH CHECK ((select auth.uid()) = (SELECT user_id FROM profiles WHERE id = profile_id));

-- Apenas UPDATE
CREATE POLICY "Usuários podem atualizar site"
    ON sites FOR UPDATE
    USING ((select auth.uid()) = (SELECT user_id FROM profiles WHERE id = profile_id));

-- Apenas DELETE
CREATE POLICY "Usuários podem deletar site"
    ON sites FOR DELETE
    USING ((select auth.uid()) = (SELECT user_id FROM profiles WHERE id = profile_id));

-- === SUBSCRIPTIONS ===
DROP POLICY IF EXISTS "Acesso a assinaturas" ON subscriptions;
DROP POLICY IF EXISTS "Usuários podem gerenciar sua assinatura" ON subscriptions;

CREATE POLICY "Acesso a assinaturas"
    ON subscriptions FOR SELECT
    USING ((select auth.uid()) = user_id);

CREATE POLICY "Usuários podem atualizar assinatura"
    ON subscriptions FOR UPDATE
    USING ((select auth.uid()) = user_id);

-- === BLOG_POSTS ===
DROP POLICY IF EXISTS "Acesso a posts" ON blog_posts;
DROP POLICY IF EXISTS "Usuários podem gerenciar posts do seu site" ON blog_posts;

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

CREATE POLICY "Usuários podem criar posts"
    ON blog_posts FOR INSERT
    WITH CHECK (
        site_id IN (
            SELECT s.id FROM sites s
            JOIN profiles p ON s.profile_id = p.id
            WHERE p.user_id = (select auth.uid())
        )
    );

CREATE POLICY "Usuários podem atualizar posts"
    ON blog_posts FOR UPDATE
    USING (
        site_id IN (
            SELECT s.id FROM sites s
            JOIN profiles p ON s.profile_id = p.id
            WHERE p.user_id = (select auth.uid())
        )
    );

CREATE POLICY "Usuários podem deletar posts"
    ON blog_posts FOR DELETE
    USING (
        site_id IN (
            SELECT s.id FROM sites s
            JOIN profiles p ON s.profile_id = p.id
            WHERE p.user_id = (select auth.uid())
        )
    );

-- === FAQ_ITEMS ===
DROP POLICY IF EXISTS "Acesso a FAQ" ON faq_items;
DROP POLICY IF EXISTS "Usuários podem gerenciar FAQ do seu site" ON faq_items;

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

CREATE POLICY "Usuários podem criar FAQ"
    ON faq_items FOR INSERT
    WITH CHECK (
        site_id IN (
            SELECT s.id FROM sites s
            JOIN profiles p ON s.profile_id = p.id
            WHERE p.user_id = (select auth.uid())
        )
    );

CREATE POLICY "Usuários podem atualizar FAQ"
    ON faq_items FOR UPDATE
    USING (
        site_id IN (
            SELECT s.id FROM sites s
            JOIN profiles p ON s.profile_id = p.id
            WHERE p.user_id = (select auth.uid())
        )
    );

CREATE POLICY "Usuários podem deletar FAQ"
    ON faq_items FOR DELETE
    USING (
        site_id IN (
            SELECT s.id FROM sites s
            JOIN profiles p ON s.profile_id = p.id
            WHERE p.user_id = (select auth.uid())
        )
    );
