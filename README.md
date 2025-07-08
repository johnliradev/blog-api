# Blog API

Uma API RESTful para gerenciamento de artigos de blog, construída com Node.js, TypeScript, Fastify e MongoDB.

## Funcionalidades

- **CRUD de artigos:** Crie, leia, atualize e delete artigos.
- **Filtragem por data:** Busque artigos dentro de um intervalo de datas.
- **Filtragem por tags:** Busque artigos que contenham determinadas tags.
- **Validação de dados:** Schemas robustos para validação de entrada e saída.
- **Tratamento de erros:** Respostas padronizadas para erros comuns.
- **Estrutura modular:** Separação clara entre controllers, services, repository e schemas.
- **Documentação interativa:** Todas as rotas podem ser acessadas e testadas via Swagger UI em [`/docs`](http://localhost:3000/docs).

## Rotas Principais

| Método | Rota                      | Descrição                                 |
| ------ | ------------------------- | ----------------------------------------- |
| GET    | `/articles`               | Lista todos os artigos                    |
| GET    | `/articles/:id`           | Busca artigo por ID                       |
| POST   | `/articles`               | Cria um novo artigo                       |
| PUT    | `/articles/:id`           | Atualiza um artigo                        |
| DELETE | `/articles/:id`           | Remove um artigo                          |
| GET    | `/articles/by-date-range` | Busca artigos por intervalo de datas      |
| GET    | `/articles/by-tags`       | Busca artigos por tags (ex: ?tags=js,api) |


## Como rodar o projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure o MongoDB:**

   - Certifique-se de ter uma instância do MongoDB rodando.
   - Configure a string de conexão no arquivo de configuração (ex: `.env` ou diretamente em `src/lib/database.ts`).

4. **Inicie o servidor:**

   ```bash
   npm run dev
   ```

   O servidor estará disponível em `http://localhost:3000`.

   Acesse a documentação interativa do Swagger em [`/docs`](http://localhost:3000/docs).

## Estrutura do Projeto

```
src/
  articles/
    controllers.ts
    repository.ts
    services.ts
    types.ts
  http/
    errors/
      errorHandler.ts
      errors.ts
    routes/
      routes.ts
      schemas.ts
    server.ts
  lib/
    database.ts
    fastify.ts
```

**Licença:** MIT
