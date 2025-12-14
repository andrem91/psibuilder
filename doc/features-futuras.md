# 🚀 Roadmap de Features Futuras - PsiBuilder

**Última atualização:** Dezembro 2024  
**Status atual:** Fase 2 Completa

---

## 📊 Métricas Avançadas Internas

### Prioridade Alta
| Feature | Descrição | Complexidade |
|---------|-----------|--------------|
| **Tempo na página** | Calcular quanto tempo o visitante permanece no site | Médio |
| **Scroll depth** | Até onde o visitante rolou a página (25%, 50%, 75%, 100%) | Simples |
| **Dispositivo** | Identificar se é Mobile, Desktop ou Tablet | Simples |
| **Horário de pico** | Agrupar acessos por hora para identificar melhores horários | Simples |

### Prioridade Média
| Feature | Descrição | Complexidade |
|---------|-----------|--------------|
| **Taxa de rejeição** | % de visitantes que saem sem interagir | Médio |
| **Páginas por sessão** | Quantas páginas o visitante navega | Médio |
| **Geolocalização** | Cidade/Estado do visitante (via IP) | Complexo |
| **Navegador** | Chrome, Safari, Firefox, etc. | Simples |

### Implementação Técnica
```typescript
// Eventos a adicionar no SiteTracker:
- scroll_25, scroll_50, scroll_75, scroll_100
- time_on_page (ping a cada 30s)
- device_type (user-agent parsing)

// Colunas a adicionar em site_analytics:
- avg_time_on_page INTEGER
- scroll_depth_avg INTEGER
- mobile_visits INTEGER
- desktop_visits INTEGER
```

---

## 💳 Integração de Pagamentos (Asaas)

### Funcionalidades
| Feature | Descrição | Status |
|---------|-----------|--------|
| Criação de cliente no Asaas | Quando fizer upgrade | Pendente |
| Checkout de assinatura | Pix, Boleto, Cartão | Pendente |
| Webhooks de pagamento | Atualizar status automaticamente | Pendente |
| Gestão de faturas | Histórico de pagamentos | Pendente |
| Troca de cartão | Self-service no dashboard | Pendente |
| Cancelamento | Com período de carência | Pendente |

### Sandbox
- API Sandbox disponível para testes
- Documentação: https://docs.asaas.com

---

## 📝 Blog Integrado

### Funcionalidades
| Feature | Descrição |
|---------|-----------|
| Editor de posts | WYSIWYG com Tiptap |
| SEO automático | Meta tags, OG images |
| Categorias | Organização de conteúdo |
| Agendamento | Publicar em data futura |
| Rascunhos | Salvar antes de publicar |
| Imagens | Upload e otimização |

### Estrutura
- Tabela `blog_posts` já existe no schema
- Rota `/site/[subdomain]/blog`
- Rota `/site/[subdomain]/blog/[slug]`

---

## 🌐 Domínio Personalizado

### Wizard de Configuração DNS
| Etapa | Descrição |
|-------|-----------|
| 1. Verificação | Usuário informa domínio |
| 2. Tutorial | Instruções passo-a-passo por registrador |
| 3. Aguardar propagação | Verificação automática |
| 4. SSL | Certificado automático via Vercel |

### Registradores Suportados (tutoriais)
- Registro.br
- GoDaddy
- Hostinger
- Cloudflare

---

## 🎨 Sistema de Templates

### MVP
| Template | Descrição |
|----------|-----------|
| Clássico | Layout atual |
| Moderno | Mais ousado, gradientes |
| Minimalista | Clean, muito branco |

### Futuro
- Marketplace de templates
- Templates por especialidade
- Customização avançada (CSS custom)

---

## 📅 Módulo de Agenda

### Funcionalidades
| Feature | Descrição |
|---------|-----------|
| Calendário visual | Ver compromissos |
| Agendamento online | Pacientes marcam direto |
| Lembretes WhatsApp | Notificações automáticas |
| Integração Google Calendar | Sync bidirecional |
| Horários disponíveis | Configuração de slots |

### Complexidade: Alta
- Requer sistema de disponibilidade
- Integração com WhatsApp Business API (futuro)

---

## 💬 Atendimento Online (Teleconsulta)

### Funcionalidades
| Feature | Descrição |
|---------|-----------|
| Videochamada | Integração Jitsi/Daily.co |
| Sala de espera | Paciente aguarda |
| Chat | Mensagens durante consulta |
| Compartilhamento de tela | Para materiais |
| Gravação (opt-in) | Com consentimento |

### Complexidade: Muito Alta
- Considerar integração com plataformas existentes primeiro

---

## 🔐 Compliance CFP

### Funcionalidades
| Feature | Descrição |
|---------|-----------|
| Validação CRP via API | Verificar registro no CFP |
| Selo de verificação | Badge no site do psicólogo |
| Termos de uso éticos | Template adequado |
| LGPD compliance | Política de privacidade |

### Pesquisar
- API do CFP (se existir)
- Web scraping como alternativa

---

## 📧 Email Marketing

### Funcionalidades
| Feature | Descrição |
|---------|-----------|
| Lista de contatos | Captura via formulário |
| Templates de email | Layouts prontos |
| Campanhas | Envio em massa |
| Automações | Sequências de boas-vindas |

### Integração
- Resend (já usado para contato)
- Ou integrar com Mailchimp/Brevo

---

## 🌙 Dark Mode

### Onde aplicar
| Local | Prioridade |
|-------|------------|
| Dashboard | Média |
| Site público | Baixa (opção do visitante) |
| Editor | Média |

---

## 📱 App Mobile (PWA)

### Funcionalidades
| Feature | Descrição |
|---------|-----------|
| Instalável | Add to home screen |
| Offline | Acesso básico sem internet |
| Push notifications | Alertas de novos contatos |

### Complexidade: Média
- Next.js suporta PWA nativamente

---

## 🤖 AI Features

### Funcionalidades
| Feature | Descrição | Ética |
|---------|-----------|-------|
| Gerador de bio | Sugestões de texto | OK |
| Sugestão de posts | Ideias para blog | OK |
| Resumo de consulta | **NÃO** - Questões éticas | ❌ |
| Chatbot no site | Atendimento inicial | Cuidado |

### Considerações Éticas
- Não gerar conteúdo clínico
- Sempre revisão humana
- Transparência sobre uso de AI

---

## 📊 Backoffice Admin

### Funcionalidades
| Feature | Descrição |
|---------|-----------|
| Dashboard MRR | Receita mensal recorrente |
| Crescimento | Novos usuários por período |
| Gestão de usuários | Lista, busca, status |
| Monitor de domínios | Verificação SSL/DNS |
| Churn analysis | Taxa de cancelamento |

---

## 🔄 Integrações Externas

### Prioridade Alta
| Integração | Descrição |
|------------|-----------|
| Google Meu Negócio | Sync de dados |
| Calendly | Alternativa a agenda própria |
| Zenvia/Twilio | WhatsApp Business API |

### Prioridade Média
| Integração | Descrição |
|------------|-----------|
| Docplanner | Listagem de profissionais |
| PsicoManager | ERP para psicólogos |
| Pipefy | Automação de processos |

---

## 📋 Ordem de Implementação Sugerida

1. **Fase 3 (Monetização)**
   - Integração Asaas (pagamentos)
   - Planos funcionando de verdade
   
2. **Fase 4 (Engajamento)**
   - Blog integrado
   - Métricas avançadas
   
3. **Fase 5 (Diferenciação)**
   - Domínio personalizado
   - Templates adicionais
   
4. **Fase 6 (Expansão)**
   - Agenda online
   - Integrações externas

---

## 📝 Notas

- Priorizar sempre funcionalidades que gerem valor para o psicólogo
- Considerar feedback de usuários beta
- Manter simplicidade (evitar feature creep)
- Compliance ético é prioridade máxima
