# 🗺️ Roadmap de Correções UX - PsiBuilder

> Plano de ação para resolução dos 70+ problemas identificados na análise de UX.
> 
> **Data:** Dezembro 2024  
> **Responsável:** Equipe de Desenvolvimento

---

## 📊 Visão Geral

| Fase | Prazo | Qtd Issues | Status |
|------|-------|-----------|--------|
| 1 - Críticos | 1-2 dias | 5 | ⏳ Pendente |
| 2 - Altos | 1 semana | 10 | ⏳ Pendente |
| 3 - Médios | 2 semanas | 22 | ⏳ Pendente |
| 4 - Baixos | Backlog | 33+ | ⏳ Pendente |

---

# 🔴 FASE 1: CRÍTICOS (1-2 dias)

## Estimativa: 4-6 horas de trabalho

### 1.1 Corrigir lang="en" → "pt-BR"
- [ ] **Arquivo:** `src/app/layout.tsx:26`
- [ ] **Ação:** Alterar `<html lang="en">` para `<html lang="pt-BR">`
- [ ] **Tempo:** 5 minutos
- [ ] **Impacto:** SEO, acessibilidade, leitores de tela

### 1.2 Atualizar Metadata Genérica
- [ ] **Arquivo:** `src/app/layout.tsx:15-18`
- [ ] **Ação:** Substituir "Create Next App" por metadata real do PsiBuilder
- [ ] **Tempo:** 10 minutos

```tsx
export const metadata: Metadata = {
  title: "PsiBuilder - Crie seu Site Profissional de Psicologia",
  description: "A plataforma mais fácil para psicólogos criarem sites profissionais. Grátis, rápido e adequado às normas do CRP.",
  keywords: "psicólogo, site, psicologia, criador de site, CRP, site profissional",
  openGraph: {
    title: "PsiBuilder - Site para Psicólogos",
    description: "Crie seu site profissional em 5 minutos",
    type: "website",
  },
};
```

### 1.3 Corrigir Typo "calma em e"
- [ ] **Arquivo:** `src/app/dashboard/site/site-editor.tsx:603`
- [ ] **Ação:** Remover "em" → "calma e profissionalismo"
- [ ] **Tempo:** 2 minutos

### 1.4 Verificar/Implementar Envio de Email
- [ ] **Arquivo:** `src/app/api/site/contact/route.ts`
- [ ] **Ação:** Implementar integração Resend ou verificar configuração existente
- [ ] **Tempo:** 2-4 horas
- [ ] **Dependência:** Configurar RESEND_API_KEY no .env

### 1.5 Traduzir Mensagens de Erro do Supabase
- [ ] **Arquivos:** `src/app/(auth)/actions.ts`, componentes de login/signup
- [ ] **Ação:** Criar função de tradução para erros comuns
- [ ] **Tempo:** 1-2 horas

```typescript
const ERROR_TRANSLATIONS: Record<string, string> = {
  "Invalid login credentials": "Email ou senha incorretos",
  "Email not confirmed": "Por favor, confirme seu email antes de entrar",
  "User already registered": "Este email já está cadastrado",
  // ... adicionar mais
};
```

---

# 🟠 FASE 2: ALTOS (1 semana)

## Estimativa: 12-16 horas de trabalho

### 2.1 Menu Mobile na Landing Page
- [ ] **Arquivo:** `src/components/landing/navbar.tsx`
- [ ] **Ação:** Implementar hamburger menu com drawer
- [ ] **Tempo:** 2-3 horas

### 2.2 Criar Página de Suporte
- [ ] **Arquivo:** Criar `src/app/dashboard/suporte/page.tsx`
- [ ] **Ação:** Página com FAQ, contato, tutoriais básicos
- [ ] **Tempo:** 2 horas

### 2.3 Corrigir URLs Hardcoded
- [ ] **Arquivos:** 
  - `src/app/dashboard/page.tsx`
  - `src/app/dashboard/site/page.tsx`
  - `src/app/dashboard/site/site-editor.tsx`
  - `src/components/blog/blog-list.tsx`
- [ ] **Ação:** Usar `process.env.NEXT_PUBLIC_APP_URL` ou detecção de ambiente
- [ ] **Tempo:** 1 hora

### 2.4 Redirect Após Confirmação de Email
- [ ] **Arquivo:** `src/app/auth/callback/route.ts`
- [ ] **Ação:** Detectar tipo de callback e redirecionar para login com mensagem
- [ ] **Tempo:** 1-2 horas

### 2.5 Adicionar "Esqueci Minha Senha"
- [ ] **Arquivos:** 
  - `src/app/(auth)/login/login-form.tsx`
  - Criar `src/app/(auth)/recuperar-senha/page.tsx`
  - `src/app/(auth)/actions.ts`
- [ ] **Ação:** Implementar fluxo completo de reset de senha
- [ ] **Tempo:** 3-4 horas

### 2.6 Auto-preencher Campos SEO
- [ ] **Arquivo:** `src/app/dashboard/site/site-editor.tsx`
- [ ] **Ação:** Sugerir valores baseados no perfil quando campos vazios
- [ ] **Tempo:** 1 hora

### 2.7 Ocultar Card "Completar Perfil"
- [ ] **Arquivo:** `src/app/dashboard/page.tsx`
- [ ] **Ação:** Esconder quando profileProgress >= 100 ou mudar para "Editar Perfil"
- [ ] **Tempo:** 30 minutos

### 2.8 Link Mágico - Melhorar UX
- [ ] **Arquivo:** `src/app/(auth)/login/login-form.tsx`
- [ ] **Ação:** Adicionar tooltip explicativo e melhorar copy
- [ ] **Tempo:** 30 minutos

### 2.9 Upload de Foto no Onboarding
- [ ] **Arquivo:** `src/components/onboarding/onboarding-wizard.tsx`
- [ ] **Ação:** Adicionar step opcional de upload de foto/logo
- [ ] **Tempo:** 2-3 horas

### 2.10 Open Graph e Twitter Cards
- [ ] **Arquivos:** `src/app/layout.tsx`, páginas específicas
- [ ] **Ação:** Adicionar metadados para compartilhamento social
- [ ] **Tempo:** 1 hora

---

# 🟡 FASE 3: MÉDIOS (2 semanas)

## Estimativa: 20-30 horas de trabalho

### Acessibilidade
- [ ] 3.1 Adicionar aria-labels em todos os botões de ícone
- [ ] 3.2 Implementar Skip Link no topo das páginas
- [ ] 3.3 Melhorar contraste do focus state
- [ ] 3.4 Auditar contraste de texto (WCAG AA)

### Formulários e Validação
- [ ] 3.5 Adicionar máscaras de input (WhatsApp, CRP, telefone)
- [ ] 3.6 Validação visual em forms (borda verde/vermelha)
- [ ] 3.7 Reenviar email de confirmação
- [ ] 3.8 Indicador de força de senha

### Dashboard
- [ ] 3.9 Seletor de período em Estatísticas (funcional)
- [ ] 3.10 Substituir confirm() por modais estilizados
- [ ] 3.11 Confirmação antes de despublicar site
- [ ] 3.12 Timestamp "Última atualização" no dashboard
- [ ] 3.13 Loading state nas tabs do editor
- [ ] 3.14 Corrigir forma da foto (redonda vs quadrada)

### Site Público
- [ ] 3.15 WhatsApp button aparecer antes (100px scroll)
- [ ] 3.16 Footer links /privacidade e /cookies no contexto do site
- [ ] 3.17 Hero - link para ver todas especialidades

### Landing
- [ ] 3.18 Revisar banner de urgência (ética de marketing)

---

# 🟢 FASE 4: BACKLOG (Contínuo)

### Quick Wins (fáceis)
- [ ] 4.1 Criar componente Textarea padronizado
- [ ] 4.2 Contador de caracteres no Rich Text Editor
- [ ] 4.3 Page 404 customizada
- [ ] 4.4 Melhores mensagens de erro de upload
- [ ] 4.5 Botão retry em estados de erro

### Melhorias de UX
- [ ] 4.6 Loading skeletons em todas as listas
- [ ] 4.7 Auto-save em formulários longos
- [ ] 4.8 Preview live no editor de site
- [ ] 4.9 Tour guiado para novos usuários
- [ ] 4.10 Steps do onboarding clicáveis

### Features Futuras
- [ ] 4.11 Dark mode
- [ ] 4.12 Notificações toast globais
- [ ] 4.13 Sugestões de temas para blog
- [ ] 4.14 Campo de gênero para personalizar "Psicólogo(a)"
- [ ] 4.15 Limite de 3 especialidades no plano gratuito

---

# 📋 Checklist de Testes

Após cada fase, verificar:

- [ ] Build passa sem erros (`npm run build`)
- [ ] Lighthouse score mantido (Performance, SEO, Accessibility)
- [ ] Fluxos principais funcionando (cadastro, login, edição, publicação)
- [ ] Mobile responsivo
- [ ] Mensagens de erro em português

---

# 🔄 Processo de Desenvolvimento

1. **Branch:** Criar branch `fix/ux-fase-X` para cada fase
2. **Commits:** Commits pequenos e descritivos
3. **PR:** Pull request com checklist de itens resolvidos
4. **Review:** Code review antes de merge
5. **Deploy:** Deploy em staging antes de produção

---

# 📞 Contato e Dúvidas

Para questões sobre priorização ou esclarecimentos técnicos, consultar:
- Análise completa em `/doc/ux_analysis_report.md`
- Issues no GitHub

---

> **Última atualização:** 16/12/2024
