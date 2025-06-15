# Blog API

Uma API RESTful moderna para gerenciamento de posts de blog, construída com Fastify, TypeScript e PostgreSQL.

## 🚀 Tecnologias

[Fastify](https://www.fastify.io/) | [TypeScript](https://www.typescriptlang.org/) | [PostgreSQL](https://www.postgresql.org/) | [Docker](https://www.docker.com/) | [Swagger](https://swagger.io/)

## ✨ Funcionalidades

- CRUD completo de posts
- Validação de dados com TypeBox
- Documentação automática com Swagger
- Logging estruturado com Pino
- Tratamento de erros centralizado
- Containerização com Docker

## 🛠️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/blog-api.git
cd blog-api
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações.

4. Inicie o banco de dados com Docker:

```bash
docker-compose up -d
```

5. Execute a aplicação:

```bash
pnpm dev
```

## 📝 Variáveis de Ambiente

```env
PORT=8080
DB_URL=postgres://user:password@localhost:5432/blog
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=blog
```

## 📚 Endpoints

A documentação completa da API está disponível em `/docs` quando o servidor estiver rodando.

### Posts

- `GET /posts` - Lista todos os posts
- `GET /posts/:id` - Busca um post específico
- `POST /posts` - Cria um novo post
- `PATCH /posts/:id` - Atualiza um post
- `DELETE /posts/:id` - Remove um post

## 🔧 Desenvolvimento

```bash
# Iniciar em modo desenvolvimento
pnpm dev
```

## 📦 Scripts Disponíveis

- `pnpm dev` - Inicia o servidor em modo desenvolvimento
- `pnpm test` - Executa os testes
- `pnpm build` - Compila o projeto
