# CMP1611 Transporte de Passageiros

Este projeto é uma aplicação de controle de viagens urbanas de passageiros construída com NestJS, Prisma e PostgreSQL. A aplicação atende às regras de negócio de uma empresa de transporte de passageiros, gerenciando veículos, motoristas, proprietários, passageiros e viagens.

## Tecnologias Utilizadas

- NestJS
- Prisma ORM
- PostgreSQL
- Docker

## Configuração e Execução

### Pré-requisitos

- Docker e Docker Compose instalados
- Node.js instalado

### Passos para Executar

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/cmp1611-transporte.git
    cd cmp1611-transporte
    ```

2. Construa e inicie os serviços Docker:
    ```sh
    docker-compose up --build
    ```

3. Acesse a aplicação no navegador:
    ```
    http://localhost:3000
    ```

### Estrutura do Projeto

- `src/`: Contém o código-fonte da aplicação.
- `prisma/`: Contém o esquema do Prisma e as migrações.
- `Dockerfile`: Configuração do Docker para o aplicativo Node.js.
- `docker-compose.yml`: Configuração do Docker Compose para serviços do aplicativo e banco de dados.

### Estrutura do `docker-compose.yml`

### Arquivo teste-app.json
- O arquivo pode ser importado para o Postman assim ja criando todos os endpoint com modelos a serem cadastrados no sistema.

```yaml
version: '3.8'

services:
  app:
    container_name: nestjs_app1
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/home/node/app
    depends_on:
      db:
        condition: service_healthy
    environment:
      - RUNNING_IN_DOCKER=true
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/cmp1611_db?schema=public

  db:
    container_name: postgres_db1
    image: postgres:13
    restart: always
    ports:
      - "5556:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: cmp1611_db
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
    volumes:
      - pg_data:/var/lib/postgresql/data

volumes:
  pg_data:
