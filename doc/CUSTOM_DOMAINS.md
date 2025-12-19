# Guia de Configuração de Domínios Personalizados

O sistema **PsicoSites** já está preparado nativamente para suportar domínios personalizados (ex: `www.psicoana.com.br`) além dos subdomínios padrão (ex: `ana.psicosites.com.br`).

## Como funciona (Arquitetura)

1.  **Middleware (`src/middleware.ts`)**:
    *   Intercepta todas as requisições.
    *   Identifica se o acesso é através de um domínio principal (`psicosites.com.br`), um subdomínio ou um domínio externo.
    *   Se for um domínio externo (customizado), ele reescreve a rota internamente para `/site/[dominio-customizado]`.

2.  **Página do Site (`src/app/site/[subdomain]/page.tsx`)**:
    *   A lógica de busca de dados (`getSiteData`) já verifica automaticamente se o parâmetro recebido corresponde ao `subdomain` OU ao `custom_domain` no banco de dados.

## Passo a Passo para Configuração

### 1. No Banco de Dados (Supabase)
Para ativar um domínio para um psicólogo, você precisa atualizar o registro na tabela `sites`:
*   Localize o site do psicólogo.
*   Preencha o campo `custom_domain` com o domínio desejado (ex: `psicoana.com.br`).

### 2. No Vercel (Hospedagem)
Para que a Vercel aceite o tráfego desse domínio, você tem duas opções:

#### Opção A: Domínios Wildcard (Recomendado para Escala)
*   Se você tiver um plano Pro/Enterprise na Vercel, pode configurar um domínio wildcard (`*.psicosites.com.br`) e utilizar a **Vercel Platforms Starter Kit** approach para custom domains (adicionando domínios via API da Vercel).
*   *Nota: Isso geralmente requer configuração de API para adicionar domínios programmaticamente.*

#### Opção B: Adição Manual (Para MVP/Início)
1.  Vá no Dashboard do projeto na Vercel.
2.  Settings -> Domains.
3.  Adicione o domínio do cliente (ex: `psicoana.com.br`).
4.  A Vercel vai gerar os registros DNS necessários.

### 3. No Provedor de Domínio (DNS do Cliente)
O psicólogo (ou você) precisa configurar o DNS no registro.br, GoDaddy, Hostinger, etc.

*   **Tipo**: `CNAME`
*   **Nome**: `www` (ou `@`)
*   **Valor**: `cname.vercel-dns.com` (ou o IP fornecido pela Vercel).

## Teste
Após a propagação do DNS (pode levar até 48h):
1.  Acesse `http://psicoana.com.br`.
2.  O middleware reconhecerá o domínio.
3.  O site será carregado com as informações do psicólogo corretas.
