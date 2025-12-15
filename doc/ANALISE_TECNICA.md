# 🔍 Análise Técnica e Plano de Ação - PsiBuilder

**Data:** 15 de Dezembro de 2024  
**Versão:** 1.0

---

## 📊 Resumo Executivo

Após análise detalhada do código, identifiquei **18 itens** que precisam de atenção, categorizados por prioridade. O código está bem estruturado, mas há débitos técnicos que devem ser resolvidos antes do MVP.

| Categoria | Crítico | Importante | Melhoria |
|-----------|---------|------------|----------|
| **Bugs/UX** | 3 | 2 | 2 |
| **Performance** | 0 | 2 | 1 |
| **Segurança** | 1 | 0 | 0 |
| **Código** | 0 | 3 | 4 |

---

## 🔴 CRÍTICO (Bloqueia Lançamento)

### 1. Fluxo de Cadastro Não Redireciona
**Local:** `src/app/(auth)/cadastro/signup-form.tsx`  
**Problema:** Após cadastro, usuário vê mensagem de sucesso mas continua na página. Se clicar login, já está autenticado.  
**Solução:** Após confirmação de email (via callback), redirecionar para onboarding ou mostrar tela de "confirme seu email".

### 2. Links de Políticas Quebrados (Footer)
**Local:** `src/components/site/site-footer.tsx` (linhas 80-88)  
**Problema:** Links de "Política de Privacidade" e "Política de Cookies" apontam para `href="#"`.  
**Solução:** Criar páginas `/privacidade` e `/cookies` ou gerar políticas dinâmicas por psicólogo.

### 3. Links de Termos Quebrados (Cadastro)
**Local:** `src/app/(auth)/cadastro/signup-form.tsx` (linhas 104-110)  
**Problema:** Links para `/termos` e `/privacidade` não existem.  
**Solução:** Criar páginas estáticas com políticas genéricas do PsiBuilder.

---

## 🟠 IMPORTANTE (Deve Resolver Antes do MVP)

### 4. Especialidades com Descrição Hardcoded
**Local:** `src/app/site/[subdomain]/page.tsx` (linha 312)  
**Problema:** Todas as especialidades têm a mesma descrição: "Atendimento especializado e humanizado."  
**Solução Simples:** Remover a descrição genérica ou mostrar apenas o nome.  
**Solução Ideal:** Migrar `specialties` de TEXT[] para JSONB com {name, description, icon}.

### 5. Ícones de Especialidades Iguais
**Local:** `src/app/site/[subdomain]/page.tsx` (linhas 296-306)  
**Problema:** Todos os cards usam o mesmo ícone de coração.  
**Solução:** Mapeamento de ícones por especialidade ou remover ícones.

### 6. Performance: Queries Sequenciais
**Local:** `src/app/site/[subdomain]/page.tsx` (linhas 52-65)  
**Problema:** FAQs e Testimonials são buscados sequencialmente (await em série).  
**Solução:** Usar `Promise.all()` para buscar em paralelo.
```typescript
const [faqs, testimonials] = await Promise.all([
  supabase.from("site_faqs")...,
  supabase.from("site_testimonials")...
]);
```

### 7. Performance: Não Usa next/image
**Local:** Múltiplos arquivos (page.tsx, blog-list.tsx, etc.)  
**Problema:** Todas as imagens usam `<img>` padrão. Perde otimização do Next.js.  
**Solução:** Configurar `remotePatterns` no `next.config.ts` e usar `<Image />`.

---

## 🟡 MELHORIA (Bom ter, não bloqueia)

### 8. Segurança: dangerouslySetInnerHTML Não Sanitizado
**Locais:**
- `page.tsx:263` - profile.bio
- `page.tsx:432` - google_maps_embed
- `blog/[slug]/page.tsx:179` - post.content

**Problema:** HTML renderizado diretamente sem sanitização. Risco de XSS.  
**Solução:** Instalar `isomorphic-dompurify` e sanitizar antes de renderizar.

### 9. Código Duplicado: Cores Padrão
**Problema:** `primaryColor = "#6366f1"` definido em múltiplos arquivos.  
**Solução:** Criar `src/lib/constants.ts` com valores padrão centralizados.

### 10. Falta Campo booking_url
**Problema:** CTA "Agendar Consulta" sempre leva para #contato. Psicólogos que usam Doctoralia/Calendly precisam de link externo.  
**Solução:** Adicionar `booking_url` na tabela profiles e usar como href do botão.

### 11. Paginação do Blog Inexistente
**Local:** `src/app/site/[subdomain]/blog/page.tsx`  
**Problema:** Busca todos os posts sem limite.  
**Solução (futuro):** Implementar `.range(0, 9)` e "Carregar mais".

### 12. Seção "Para Quem é?" (Dores do Paciente)
**Problema:** Falta conexão empática imediata. Paciente não se identifica.  
**Solução (futuro):** Adicionar seção com checkmarks das dores que o psicólogo trata.

---

## 📋 PLANO DE AÇÃO PRIORIZADO

### Sprint 1 - Bugs Críticos (Antes do MVP)
| # | Item | Complexidade | Tempo Est. |
|---|------|--------------|------------|
| 1 | Criar páginas `/termos`, `/privacidade`, `/cookies` | Simples | 30 min |
| 2 | Corrigir links do Footer (usar novas páginas) | Simples | 10 min |
| 3 | Melhorar fluxo pós-cadastro (tela de confirmação) | Médio | 1h |

### Sprint 2 - Performance e UX
| # | Item | Complexidade | Tempo Est. |
|---|------|--------------|------------|
| 4 | Implementar Promise.all para FAQs/Testimonials | Simples | 15 min |
| 5 | Remover descrição hardcoded das especialidades | Simples | 10 min |
| 6 | Mapear ícones por especialidade (ou remover) | Médio | 30 min |
| 7 | Configurar next/image com remotePatterns | Médio | 45 min |

### Sprint 3 - Segurança e Código
| # | Item | Complexidade | Tempo Est. |
|---|------|--------------|------------|
| 8 | Sanitizar HTML com DOMPurify | Médio | 30 min |
| 9 | Centralizar constantes (cores padrão) | Simples | 20 min |
| 10 | Adicionar booking_url (opcional) | Médio | 45 min |

### Backlog (Pós-MVP)
- Paginação do blog
- Seção "Para Quem é?"
- Especialidades com JSONB (name, description, icon)

---

## ✅ O QUE ESTÁ BOM

1. **Arquitetura** - Separação clara entre dashboard (autenticado) e site (público)
2. **Middleware** - Multitenancy via subdomínio bem implementado
3. **Server Actions** - Mutações seguras no servidor
4. **RLS** - Políticas otimizadas com `(select auth.uid())`
5. **Blog** - CRUD completo e funcional
6. **SEO** - Meta tags dinâmicas por página
7. **Estatísticas** - Tracking de page views, cliques funcionando

---

## 📝 RECOMENDAÇÃO FINAL

**Prioridade para lançar MVP:**
1. ✅ Sprint 1 (Bugs críticos de UX/legal)
2. ✅ Sprint 2 (Performance perceptível)
3. ⏳ Sprint 3 (Pode fazer após lançar beta)
4. 💳 Implementar Asaas (pagamentos)
5. 🎫 Ativar limitação por plano
