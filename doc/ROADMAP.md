# 🗺️ Roadmap - PsiBuilder

**Última atualização:** Dezembro 2024  
**Versão:** 1.0

---

## 📌 Status Geral

| Fase | Status | Descrição |
|------|--------|-----------|
| **Fase 1 - Base** | ✅ Concluída | Auth, Dashboard, Profiles |
| **Fase 2 - Sites** | ✅ Concluída | Editor, Personalização, Publicação |
| **Fase 3 - Engajamento** | ✅ Concluída | Blog, SEO, Estatísticas |
| **Fase 4 - Monetização** | ⏳ Próxima | Pagamentos, Planos funcionais |
| **Fase 5 - Diferenciação** | 📋 Planejada | Templates, Domínio Customizado |
| **Fase 6 - Expansão** | 📋 Planejada | Agenda, Integrações |

---

## ✅ MVP - Funcionalidades Implementadas

### 🔐 Autenticação e Usuários
- [x] Login/Cadastro com Supabase Auth
- [x] Gestão de perfil do psicólogo
- [x] Onboarding gamificado (wizard 4 steps)
- [x] Upload de foto de perfil e logo

### 🌐 Editor de Sites
- [x] Personalização de cores (cor primária, secundária)
- [x] Editor de texto rico (Tiptap) para "Sobre mim"
- [x] Frase de apresentação (bio_short)
- [x] Configuração de horários de atendimento
- [x] Upload de imagens otimizado (Sharp)
- [x] Preview do site em tempo real

### 📄 Página Pública do Psicólogo
- [x] Layout responsivo mobile-first
- [x] Seção Hero com CTA
- [x] Seção Sobre
- [x] Seção Especialidades
- [x] Seção FAQs (editável)
- [x] Seção Depoimentos (editável)
- [x] Formulário de contato funcional (Resend)
- [x] Botão flutuante WhatsApp
- [x] SEO básico (meta tags)

### 📝 Blog Integrado
- [x] CRUD completo de artigos
- [x] Editor com formatação (Tiptap)
- [x] Upload de imagem de capa
- [x] Rascunho vs Publicado
- [x] Página pública /blog
- [x] Página do artigo /blog/[slug]
- [x] SEO com Open Graph
- [x] Estilos CSS para conteúdo

### 📊 Estatísticas
- [x] Page views
- [x] Visitantes únicos
- [x] Cliques no WhatsApp
- [x] Cliques em CTA
- [x] Fontes de tráfego (referrers)
- [x] Dashboard visual com gráficos

### ⚙️ Infraestrutura
- [x] Supabase configurado (migrações versionadas)
- [x] Storage com bucket profile-images
- [x] Políticas RLS otimizadas
- [x] Deploy Vercel pronto
- [x] Middleware para subdomínios

---

## ⏳ Para Lançar MVP (Pendentes)

### 💳 Integração de Pagamentos (Asaas)
| Item | Status |
|------|--------|
| Criação de cliente no Asaas | ⏳ Pendente |
| Checkout de assinatura (Pix, Boleto, Cartão) | ⏳ Pendente |
| Webhooks para atualização de status | ⏳ Pendente |
| Gestão de faturas no dashboard | ⏳ Pendente |
| Troca de cartão self-service | ⏳ Pendente |
| Cancelamento com carência | ⏳ Pendente |

### 🎯 Planos Funcionais
| Item | Status |
|------|--------|
| Ativar/desativar recursos por plano | ⏳ Pendente |
| Limite de posts no blog por plano | ⏳ Pendente |
| Upgrade/downgrade funcional | ⏳ Pendente |

---

## 📋 Features Futuras (Pós-MVP)

### Fase 4 - Monetização
- Integração completa Asaas
- Planos Free, Básico, Pro
- Cupons de desconto
- Período trial

### Fase 5 - Diferenciação

#### 🌐 Domínio Personalizado
| Etapa | Descrição |
|-------|-----------|
| Verificação | Usuário informa domínio |
| Tutorial | Instruções por registrador (Registro.br, GoDaddy, Hostinger) |
| Propagação | Verificação automática |
| SSL | Certificado via Vercel |

#### 🎨 Sistema de Templates
| Template | Descrição |
|----------|-----------|
| Clássico | Layout atual |
| Moderno | Gradientes, ousado |
| Minimalista | Clean, muito branco |
| *Marketplace* | Futuro: templates por especialidade |

### Fase 6 - Expansão

#### 📅 Módulo de Agenda
| Feature | Descrição |
|---------|-----------|
| Calendário visual | Ver compromissos |
| Agendamento online | Pacientes marcam direto |
| Lembretes WhatsApp | Notificações automáticas |
| Integração Google Calendar | Sync bidirecional |
| Horários disponíveis | Configuração de slots |

#### 📊 Métricas Avançadas
| Feature | Complexidade |
|---------|--------------|
| Tempo na página | Médio |
| Scroll depth (25%, 50%, 75%, 100%) | Simples |
| Dispositivo (Mobile/Desktop/Tablet) | Simples |
| Horário de pico | Simples |
| Taxa de rejeição | Médio |
| Geolocalização | Complexo |

### Fase 7 - Premium

#### 💬 Teleconsulta
| Feature | Descrição |
|---------|-----------|
| Videochamada | Integração Jitsi/Daily.co |
| Sala de espera | Paciente aguarda |
| Chat durante consulta | Mensagens em tempo real |
| Compartilhamento de tela | Para materiais |

#### 📧 Email Marketing
| Feature | Descrição |
|---------|-----------|
| Lista de contatos | Captura via formulário |
| Templates de email | Layouts prontos |
| Campanhas | Envio em massa |
| Automações | Sequências de boas-vindas |

#### 🤖 AI Features
| Feature | Ética |
|---------|-------|
| Gerador de bio | ✅ OK |
| Sugestões de posts | ✅ OK |
| Chatbot no site | ⚠️ Cuidado |
| Resumo de consulta | ❌ Não implementar |

#### 🔐 Compliance CFP
| Feature | Descrição |
|---------|-----------|
| Validação CRP via API | Verificar registro |
| Selo de verificação | Badge no site |
| Termos éticos | Template adequado |
| LGPD compliance | Política de privacidade |

### Fase 8 - Enterprise

#### 📊 Backoffice Admin
| Feature | Descrição |
|---------|-----------|
| Dashboard MRR | Receita mensal recorrente |
| Crescimento | Novos usuários por período |
| Gestão de usuários | Lista, busca, status |
| Monitor de domínios | Verificação SSL/DNS |
| Churn analysis | Taxa de cancelamento |

#### 🔄 Integrações Externas
| Prioridade | Integração |
|------------|------------|
| Alta | Google Meu Negócio |
| Alta | Calendly |
| Alta | Zenvia/Twilio (WhatsApp Business) |
| Média | Docplanner |
| Média | PsicoManager |
| Futura | Sanity.io (CMS avançado) |

---

## 🎯 Critérios de Priorização

1. **Valor para o psicólogo** - Features que geram captação de pacientes
2. **Receita** - Monetização sustentável
3. **Diferenciação** - Vantagem competitiva
4. **Simplicidade** - Evitar feature creep
5. **Compliance ético** - Prioridade máxima

---

## 📝 Notas Importantes

- Priorizar feedback de usuários beta
- Manter compliance com CFP/LGPD
- AI nunca para conteúdo clínico
- Transparência sobre uso de dados
