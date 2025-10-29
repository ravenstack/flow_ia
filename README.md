# flow_ia

# Dashboard Jurídico Estratégico - SABESP

Este projeto é uma aplicação web front-end desenvolvida com React, Vite e TypeScript, utilizando Tailwind CSS e Shadcn/ui para a interface do usuário. Ele serve como um dashboard para análise estratégica de processos jurídicos, integrando dados de diferentes fontes, incluindo Machine Learning (ML) e Valor Monetário Esperado (VME). A aplicação inclui funcionalidades de autenticação e visualização de dados de processos.

## ✨ Funcionalidades Principais

* **Autenticação de Usuários:** Sistema de login e registro com backend serverless.
* **Rotas Protegidas:** Acesso restrito ao dashboard principal apenas para usuários autenticados.
* **Explorador de Processos:** Interface para buscar, filtrar e visualizar dados de processos jurídicos carregados a partir de arquivos CSV.
* **Dashboards Analíticos:** Várias páginas com visualizações de dados para análise estratégica, incluindo:
    * Análise Estratégica Geral
    * Análise de Risco (P-Score)
    * Performance e Validação do Score
    * Integração ML & VME Otimizado
    * ROI e Estratégia de Custo/Economia
    * Dashboard Executivo
* **Componentes Reutilizáveis:** Construído com Shadcn/ui, oferecendo uma vasta gama de componentes de UI consistentes e customizáveis.
* **Backend Serverless:** Funções na pasta `api/` para lidar com autenticação, sincronização de perfil e dados externos, projetadas para deploy em plataformas como Vercel.
* **Integração com Banco de Dados:** Backend utiliza Supabase (PostgreSQL via PostgREST) para armazenar perfis de usuários e dados externos sincronizados.
* **Integração com API Externa:** Backend se comunica com uma API externa (SBK) para autenticação remota.

## 🛠️ Tecnologias Utilizadas

* **Frontend:**
    * React
    * TypeScript
    * Vite (Build Tool e Dev Server)
    * Tailwind CSS (Estilização)
    * Shadcn/ui (Biblioteca de Componentes UI)
    * React Router DOM (Roteamento)
    * React Hook Form + Zod (Gerenciamento e Validação de Formulários)
    * Recharts (Gráficos)
    * TanStack React Query (Gerenciamento de Estado de Servidor - instalado, mas não vi uso explícito nos exemplos)
* **Backend (Serverless Functions na pasta `api/`):**
    * Node.js (ambiente de execução)
    * TypeScript
    * API REST (Supabase/PostgREST) para banco de dados
    * Fetch API para comunicação com API externa (SBK)

## 🚀 Configuração e Instalação

**Pré-requisitos:**

* Node.js (versão >=18 recomendada pelas dependências)
* npm (ou pnpm/yarn)

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd layout-comporativo
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o Supabase:**
    * Crie um projeto no Supabase.
    * Execute o script SQL encontrado em `supabase-auth-schema.sql` no Editor SQL do seu projeto Supabase para criar as tabelas `auth_users` e `external_profiles`.
    * Obtenha a URL da API REST e a chave `service_role` nas configurações da API do seu projeto Supabase.

4.  **Configure as Variáveis de Ambiente:**
    * **Para Desenvolvimento Local:** Crie um arquivo `.env.local` na raiz do projeto. Adicione as seguintes variáveis (substitua pelos seus valores):
        ```dotenv
        # Variáveis para o Backend (api/)
        AUTH_DB_URL=https://<sua-instancia>.supabase.co/rest/v1
        AUTH_DB_SERVICE_ROLE_KEY=<sua_chave_service_role_supabase>
        AUTH_API_BASE_URL=<url_base_api_sbk>
        AUTH_API_SERVICE_TOKEN=<token_servico_api_sbk>

        # Variável para o Frontend (src/) - PRECISA começar com VITE_
        VITE_API_BASE_URL=/api
        ```
    * **Para Deploy (Vercel, Netlify, etc.):** Configure essas mesmas variáveis de ambiente diretamente nas configurações do seu projeto na plataforma de deploy. **Não** comite o arquivo `.env.local`.

5.  **Arquivos de Dados:**
    * Certifique-se de que os arquivos CSV (`SABESP_COMPLETO_...`, `SABESP_VME_FINAL_...`) estejam localizados dentro da pasta `public/data/` para que possam ser carregados pela página de Processos. Atualmente eles estão na pasta `data/` na raiz, precisam ser movidos para `public/data/`. *Nota: O arquivo `.parquet` não parece ser usado diretamente pelo código atual.*

## ⚙️ Scripts Disponíveis

No `package.json`, você encontrará os seguintes scripts:

* `npm run dev`: Inicia o servidor de desenvolvimento Vite com hot-reloading.
* `npm run build`: Compila a aplicação para produção na pasta `dist/`.
* `npm run lint`: Executa o ESLint para análise de código.
* `npm run preview`: Inicia um servidor local para visualizar a build de produção.

## ▶️ Rodando Localmente

Após a configuração (passos 1-5 acima):

```bash
npm run dev
