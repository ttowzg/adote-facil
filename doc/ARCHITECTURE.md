# Arquitetura do Projeto Adote Fácil

Este documento descreve a arquitetura do projeto "Adote Fácil", que é um monorepo contendo tanto o backend quanto o frontend da aplicação.

## Visão Geral da Arquitetura

O projeto "Adote Fácil" adota uma arquitetura de **Monorepo**, onde o código-fonte para diferentes partes da aplicação (backend e frontend) reside em um único repositório. Dentro deste monorepo, cada parte possui sua própria arquitetura específica:

- **Backend:** Implementa uma **Arquitetura em Camadas (Layered Architecture)**.
- **Frontend:** Utiliza uma **Arquitetura Baseada em Componentes (Component-Based Architecture)**.

## Backend: Arquitetura em Camadas

O backend do projeto é construído com Node.js e Express, seguindo um padrão de arquitetura em camadas. Cada camada tem responsabilidades bem definidas, promovendo a separação de preocupações, manutenibilidade e escalabilidade.

### Camadas Principais:

1.  **Controladores (`src/controllers`):**

    - **Responsabilidade:** Receber requisições HTTP, validar dados de entrada básicos e orquestrar a chamada aos serviços apropriados. Eles atuam como a interface de entrada da aplicação.
    - **Exemplo:** Um controlador de usuário receberia uma requisição de login e a passaria para o serviço de autenticação.

2.  **Serviços (`src/services`):**

    - **Responsabilidade:** Conter a lógica de negócio principal da aplicação. Eles coordenam operações complexas que podem envolver múltiplas interações com o banco de dados ou outros serviços.
    - **Exemplo:** Um serviço de animal conteria a lógica para criar um novo animal, incluindo validações de negócio e interação com o repositório de animais.

3.  **Repositórios (`src/repositories`):**

    - **Responsabilidade:** Abstrair a lógica de acesso a dados. Eles fornecem uma interface limpa para os serviços interagirem com o banco de dados (utilizando Prisma ORM), sem se preocuparem com os detalhes de implementação do DB.
    - **Exemplo:** Um repositório de usuário conteria métodos para buscar, criar ou atualizar usuários no banco de dados.

4.  **Provedores (`src/providers`):**

    - **Responsabilidade:** Encapsular funcionalidades externas ou utilitárias que podem ser injetadas em outras camadas. Isso inclui autenticação, criptografia, etc.
    - **Exemplo:** Um provedor de autenticação lidaria com a geração e validação de tokens JWT.

5.  **Middlewares (`src/middlewares`):**
    - **Responsabilidade:** Interceptar requisições antes que cheguem aos controladores ou após serem processadas. São usados para funcionalidades transversais como autenticação, logging, tratamento de erros, etc.
    - **Exemplo:** Um middleware de autenticação verificaria se o usuário está logado antes de permitir o acesso a uma rota protegida.

## O diagrama de componentes está em diagra_componentes_af.svg

## Frontend: Arquitetura Baseada em Componentes

O frontend é desenvolvido com Next.js e React, seguindo uma arquitetura baseada em componentes. Esta abordagem promove a modularidade, reusabilidade e manutenibilidade da interface do usuário.

### Estrutura de Componentes:

- **Páginas (`src/app`):** Utilizando o App Router do Next.js, as pastas dentro de `src/app` representam as rotas da aplicação, contendo os componentes de página (`page.tsx`) e layouts (`layout.tsx`).
- **Componentes Reutilizáveis (`src/components`):** Pequenas unidades de UI independentes e reutilizáveis que encapsulam sua própria lógica e estilo.
  - **Exemplo:** `AnimalCard`, `Button`, `PasswordInput`.
- **APIs do Cliente (`src/api`):** Funções e módulos responsáveis por fazer requisições HTTP para o backend.
- **Contextos e Provedores (`src/contexts`, `src/providers`):** Utilizados para gerenciamento de estado global e para fornecer dados ou funcionalidades a múltiplos componentes sem a necessidade de "prop drilling".
- **Tipos e Enums (`src/@types`, `src/enums`):** Definições de tipos TypeScript e enums para garantir a segurança de tipo em toda a aplicação.
- **Estilos (`src/styles`):** Arquivos de estilo globais ou temas, frequentemente utilizando bibliotecas como `styled-components`.
- **Utilitários e Helpers (`src/helpers`, `src/lib`):** Funções auxiliares e lógicas de suporte que não se encaixam diretamente em componentes ou APIs.

## Conclusão

A combinação de uma arquitetura em camadas no backend e uma arquitetura baseada em componentes no frontend, dentro de um monorepo, permite uma clara separação de responsabilidades, facilita o desenvolvimento paralelo e a manutenção, e prepara o projeto para futuras expansões. A escolha dessas arquiteturas visa otimizar a organização do código e a colaboração da equipe.
