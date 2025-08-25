# Análise de DevOps e Sugestões de Melhoria

Este documento apresenta a análise da estrutura de DevOps do projeto, incorporando o pipeline de CI/CD (GitHub Actions), o arquivo `docker-compose.yml` e o `Dockerfile` do backend.

---

### Análise das Práticas Atuais

* **Há pipeline CI/CD?**
    * **Sim.** O arquivo `experimento-ci-cd.yml` demonstra um pipeline de CI/CD em funcionamento. Ele é acionado em cada `pull request` para a branch `main` e executa uma série de jobs.

* **Há testes automatizados no pipeline?**
    * **Sim.** O primeiro job, chamado `unit-test`, instala as dependências do backend e executa os testes unitários com o comando `npm test -- --coverage`. A inclusão do relatório de cobertura é uma ótima prática. No entanto, ainda não há um job de testes de integração explícito.

* **Há uso de containers?**
    * **Sim.** O projeto utiliza contêineres Docker, definidos no `docker-compose.yml` para os serviços `adote-facil-postgres`, `adote-facil-backend` e `adote-facil-frontend`. O `Dockerfile` do backend foi fornecido.

---

### Sugestões de Melhoria e Implementação

#### 1. Melhorias no Pipeline de CI/CD

O pipeline atual é bem estruturado, mas pode ser otimizado para maior eficiência e cobertura.

* **Adicionar Testes de Integração:** O job `up-containers` sobe os contêineres, mas atualmente apenas espera e derruba os serviços. É **altamente recomendado** adicionar um passo para rodar **testes de integração** automatizados (ex: testes de API com Jest ou End-to-End com Cypress para o frontend) após o `docker compose up -d`. Isso garantiria que a comunicação entre os serviços (backend e banco de dados, frontend e backend) está funcionando corretamente antes de o PR ser mesclado.

* **Otimizar Entrega de Artefato (Imagens Docker):** O job `delivery` atualmente gera um arquivo `.zip` do projeto. Em um fluxo de trabalho baseado em contêineres, o artefato final de entrega geralmente são as **imagens Docker** já construídas e testadas. A sugestão é configurar o pipeline para **fazer o login e o push das imagens construídas para um registro de contêineres** (como o GitHub Container Registry ou Docker Hub) em vez de gerar um `.zip`. Isso alinha melhor o processo de entrega com a utilização de Docker.

    **Exemplo de adição ao job `delivery` (substituindo o `zip` e `upload-artifact`):**

    ```yaml
    # ... (no job delivery)
    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Logar no GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build e Push das imagens Docker
        # Isso faria o build novamente, mas com a tag correta para push
        # Idealmente, as imagens seriam construídas apenas uma vez e reutilizadas
        run: |
          docker compose build
          docker tag adote-facil-backend:latest ghcr.io/${{ github.repository_owner }}/adote-facil-backend:latest
          docker push ghcr.io/${{ github.repository_owner }}/adote-facil-backend:latest
          docker tag adote-facil-frontend:latest ghcr.io/${{ github.repository_owner }}/adote-facil-frontend:latest
          docker push ghcr.io/${{ github.repository_owner }}/adote-facil-frontend:latest
    ```
#### 2. Melhorias em `docker-compose.yml`

* **Remover Comando de Espera Redundante:** O serviço `adote-facil-backend` usa uma instrução `command` que verifica a disponibilidade do banco de dados antes de iniciar a aplicação. No entanto, ele já utiliza a condição `depends_on: { adote-facil-postgres: { condition: service_healthy } }` para o banco de dados. Essa verificação de saúde já garante que o backend só iniciará quando o banco estiver pronto. O comando de espera é, portanto, redundante e pode ser removido para simplificar a configuração.

    **Refatoração Sugerida:**
    Remova a linha `command: sh -c "until nc -z adote-facil-postgres 5432; do echo 'Waiting for postgres...'; sleep 1; done; npm start"` do serviço `adote-facil-backend`.

#### 3. Melhorias no `Dockerfile` do Backend

O `Dockerfile` fornecido é funcional, mas algumas melhorias podem ser aplicadas para otimizar o tamanho da imagem, o tempo de build e a segurança.

* **Build em Múltiplos Estágios (Multi-stage build):** Atualmente, todas as etapas (instalação de dependências, build, testes) ocorrem em uma única imagem final. Isso faz com que a imagem final contenha ferramentas e dependências de desenvolvimento desnecessárias para o ambiente de produção, aumentando seu tamanho. Um build em múltiplos estágios permite usar um estágio para compilação e testes, e outro estágio menor e mais limpo para a imagem final de produção.

    **Refatoração Sugerida:**

    ```dockerfile
    # Estágio de Build e Teste
    FROM node:20-alpine AS builder
    # Instalação de dependências de sistema (se necessário para build/testes)
    RUN apk add --no-cache openssl
    WORKDIR /app
    # Copia apenas os arquivos de dependência primeiro para aproveitar o cache do Docker
    COPY package.json package-lock.json ./
    RUN npm install # Instala TODAS as dependências (dev e prod)
    COPY . . # Copia o restante do código
    # Rodar testes e gerar build aqui
    RUN npm run generate
    RUN npm run test # É bom rodar os testes no estágio de build
    RUN npm run build
    # Estágio de Produção
    FROM node:20-alpine AS production
    # Instalação apenas das dependências de runtime
    RUN apk add --no-cache openssl
    WORKDIR /app
    # Copia apenas o package.json e package-lock.json novamente para instalar as dependências de produção
    COPY package.json package-lock.json ./
    RUN npm install --only=production # Instala SOMENTE as dependências de produção
    # Copia os artefatos de build do estágio "builder"
    COPY --from=builder /app/dist ./dist # Adapte o caminho se a pasta de build for diferente
    COPY --from=builder /app/node_modules_prod ./node_modules # Se tiver uma pasta separada para prod
    COPY --from=builder /app/.env.production ./.env # Copie arquivos de ambiente relevantes para prod
    EXPOSE 8080
    CMD ["npm", "start"]
    ```

* **Remover Execução de Testes na Imagem Final:** O `RUN npm run test` deve idealmente ocorrer durante o estágio de `builder` de um build multi-estágio, **não** na imagem que será implantada em produção. Isso porque as ferramentas de teste não são necessárias em produção e aumentam o tamanho da imagem.

* **Otimizar Cache do Docker:** A ordem dos comandos `COPY` e `RUN npm install` pode ser otimizada. Copiar `package.json` e `package-lock.json` antes de todo o resto do código, e então rodar `npm install`, aproveita o cache do Docker. Se apenas os arquivos de dependência mudarem, o Docker não precisará re-executar `npm install` novamente.

    **Refatoração Sugerida:** (Já incluído no exemplo de multi-stage build acima)
    ```dockerfile
    # ...
    WORKDIR /app
    COPY package.json package-lock.json ./
    RUN npm install
    COPY . .
    # ...
    ```

Ao aplicar essas sugestões, o projeto terá um fluxo de DevOps mais robusto, eficiente e seguro.

# Melhorias de DevOps

Este documento detalha as melhorias implementadas nos arquivos de configuração de CI/CD e Docker para otimizar o processo de desenvolvimento e implantação.

## 1. `backend/Dockerfile`

**Melhorias:**

- **Remoção de `npm run generate` e `npm run test`:** Essas etapas foram removidas do `Dockerfile` para otimizar o tamanho da imagem e o tempo de build. Testes e geração de código (como o cliente Prisma) devem ser executados na pipeline de CI/CD, não durante a construção da imagem final de produção.

**Antes:**
```dockerfile
FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run generate

RUN npm run test

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
```

**Depois:**
```dockerfile
FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
```

## 2. `docker-compose.yml`

**Melhorias:**

- **Adição de Healthchecks:** Foram adicionados `healthcheck` para os serviços `adote-facil-backend` e `adote-facil-frontend`. Isso permite que o Docker Compose monitore a saúde das aplicações, garantindo que os serviços estejam realmente prontos antes que outros serviços dependentes iniciem ou que a pipeline de CI/CD prossiga.

**Antes:**
```yaml
services:
  adote-facil-postgres:
    image: postgres:14-alpine
    container_name: 'adote-facil-postgres'
    env_file:
      - ./backend/.env
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_CONTAINER_PORT: ${POSTGRES_CONTAINER_PORT}
    ports:
      - ${POSTGRES_CONTAINER_PORT}:5432
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - adote-facil-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 3s
      timeout: 3s
      retries: 5

  adote-facil-backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: 'adote-facil-backend'
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
    depends_on:
      adote-facil-postgres:
        condition: service_healthy
    command: sh -c "until nc -z adote-facil-postgres 5432; do echo 'Waiting for postgres...'; sleep 1; done; npm start"
    networks:
      - adote-facil-network

  adote-facil-frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: 'adote-facil-frontend'
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - adote-facil-backend
    networks:
      - adote-facil-network

volumes:
  db_data:

networks:
  adote-facil-network:
    driver: bridge
```

**Depois:**
```yaml
services:
  adote-facil-postgres:
    image: postgres:14-alpine
    container_name: 'adote-facil-postgres'
    env_file:
      - ./backend/.env
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_CONTAINER_PORT: ${POSTGRES_CONTAINER_PORT}
    ports:
      - ${POSTGRES_CONTAINER_PORT}:5432
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - adote-facil-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 3s
      timeout: 3s
      retries: 5

  adote-facil-backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: 'adote-facil-backend'
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
    depends_on:
      adote-facil-postgres:
        condition: service_healthy
    command: sh -c "until nc -z adote-facil-postgres 5432; do echo 'Waiting for postgres...'; sleep 1; done; npm start"
    networks:
      - adote-facil-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  adote-facil-frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: 'adote-facil-frontend'
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - adote-facil-backend
    networks:
      - adote-facil-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  db_data:

networks:
  adote-facil-network:
    driver: bridge
```

## 3. `.github/workflows/experimento-ci-cd.yml`

**Melhorias:**

- **Centralização de `working-directory`:** O diretório de trabalho para as etapas relacionadas ao backend no job `unit-test` foi centralizado, evitando repetições de `cd backend`.
- **Adição de Linting e Type-checking:** As etapas de `npm run lint` e `npm run build` (que geralmente inclui type-checking em projetos TypeScript) foram adicionadas ao job `unit-test`. Isso garante que problemas de qualidade de código e tipo sejam identificados mais cedo na pipeline.
- **Simplificação do `.env`:** A criação manual do arquivo `.env` no job `up-containers` foi removida. As variáveis de ambiente agora são passadas diretamente para o `docker compose up` através do ambiente do GitHub Actions, tornando a configuração mais limpa e segura.
- **Correção do `working-directory` para `docker compose up`:** O comando `docker compose up` agora é executado a partir do diretório raiz do projeto, que é o local correto do arquivo `docker-compose.yml`.
- **Manutenção do `sleep` com observação:** O `sleep 10` foi mantido para simplicidade, mas um comentário foi adicionado indicando que em um cenário de produção, seria ideal substituí-lo por um mecanismo de espera por serviço pronto (ex: `wait-for-it.sh` ou dependências de `healthcheck` mais robustas).

**Antes:**
```yaml
name: experimento-ci-cd

on:
  pull_request:
    branches:
      - main

jobs:
  unit-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Instalar dependências do backend
        run: |
          cd backend
          npm install

      - name: Executar testes unitários com Jest
        run: |
          cd backend
          npm test -- --coverage

  build:
    needs: unit-test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Configurar Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Configurar Docker QEMU
        uses: docker/setup-qemu-action@v2

      - name: Build das imagens Docker
        run: docker compose build

  up-containers:
    needs: build
    runs-on: ubuntu-latest
    env:
      POSTGRES_DB: adote_facil
      POSTGRES_HOST: adote-facil-postgres
      POSTGRES_USER: ${{ secrets.POSTGRES_USER }}
      POSTGRES_PASSWORD: ${{ secrets.POSTGRES_PASSWORD }}
      POSTGRES_PORT: 5432
      POSTGRES_CONTAINER_PORT: 6500
    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Criar arquivo .env
        working-directory: ./backend
        run: |
          echo "POSTGRES_DB=${{ env.POSTGRES_DB }}" > .env
          echo "POSTGRES_HOST=${{ env.POSTGRES_HOST }}" >> .env
          echo "POSTGRES_USER=${{ env.POSTGRES_USER }}" >> .env
          echo "POSTGRES_PASSWORD=${{ env.POSTGRES_PASSWORD }}" >> .env
          echo "POSTGRES_PORT=${{ env.POSTGRES_PORT }}" >> .env
          echo "POSTGRES_CONTAINER_PORT=${{ env.POSTGRES_CONTAINER_PORT }}" >> .env

      - name: Subir containers com Docker Compose
        working-directory: ./backend
        run: |
          docker compose up -d
          sleep 10
          docker compose down

  delivery:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Gerar arquivo ZIP do projeto completo
        run: zip -r adote-facil-projeto.zip . -x '*.git*' '*.github*' 'node_modules/*'

      - name: Upload do artefato
        uses: actions/upload-artifact@v4
        with:
          name: adote-facil-projeto
          path: adote-facil-projeto.zip
```

**Depois:**
```yaml
name: experimento-ci-cd

on:
  pull_request:
    branches:
      - main

jobs:
  unit-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Instalar dependências do backend
        working-directory: backend
        run: npm install

      - name: Lint do backend
        working-directory: backend
        run: npm run lint

      - name: Build do backend (inclui type-checking)
        working-directory: backend
        run: npm run build

      - name: Executar testes unitários com Jest
        working-directory: backend
        run: npm test -- --coverage

  build:
    needs: unit-test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Configurar Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Configurar Docker QEMU
        uses: docker/setup-qemu-action@v2

      - name: Build das imagens Docker
        run: docker compose build

  up-containers:
    needs: build
    runs-on: ubuntu-latest
    env:
      POSTGRES_DB: adote_facil
      POSTGRES_HOST: adote-facil-postgres
      POSTGRES_USER: ${{ secrets.POSTGRES_USER }}
      POSTGRES_PASSWORD: ${{ secrets.POSTGRES_PASSWORD }}
      POSTGRES_PORT: 5432
      POSTGRES_CONTAINER_PORT: 6500
    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Subir containers com Docker Compose
        run: |
          docker compose up -d
          # TODO: Substituir 'sleep' por um mecanismo de espera por serviço pronto (ex: wait-for-it.sh ou healthchecks)
          sleep 10
          docker compose down

  delivery:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Gerar arquivo ZIP do projeto completo
        run: zip -r adote-facil-projeto.zip . -x '*.git*' '*.github*' 'node_modules/*'

      - name: Upload do artefato
        uses: actions/upload-artifact@v4
        with:
          name: adote-facil-projeto
          path: adote-facil-projeto.zip
```