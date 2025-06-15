import { FastifyInstance } from "fastify";
import * as postsController from "./posts.controller";
import * as postsSchema from "./posts.schema";

export default function postsRouter(server: FastifyInstance) {
  server.get(
    "/",
    {
      schema: {
        tags: ["posts"],
        summary: "Lista todos os posts",
        description: "Retorna uma lista de todos os posts cadastrados",
        response: {
          200: {
            description: "Lista de posts",
            ...postsSchema.GetPostsResponseSchema,
          },
        },
      },
    },
    postsController.getAllPostsController
  );
  server.get(
    "/:id",
    {
      schema: {
        tags: ["posts"],
        summary: "Busca um post por ID",
        description: "Retorna um post específico baseado no ID fornecido",
        params: postsSchema.GetPostByIdParamsSchema,
        response: {
          200: {
            description: "Post encontrado",
            ...postsSchema.GetPostByIdResponseSchema,
          },
          404: {
            description: "Post não encontrado",
            type: "object",
            properties: {
              status: { type: "string" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    postsController.getPostByIdController
  );
  server.post(
    "/",
    {
      schema: {
        tags: ["posts"],
        summary: "Cria um novo post",
        description: "Cria um novo post com os dados fornecidos",
        body: postsSchema.CreatePostBodySchema,
        response: {
          201: {
            description: "Post criado com sucesso",
            ...postsSchema.CreatePostResponseSchema,
          },
          400: {
            description: "Dados inválidos",
            type: "object",
            properties: {
              status: { type: "string" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    postsController.createPostController
  );
  server.delete(
    "/:id",
    {
      schema: {
        tags: ["posts"],
        summary: "Deleta um post",
        description: "Deleta um post específico baseado no ID fornecido",
        params: postsSchema.DeletePostParamsSchema,
        response: {
          204: {
            description: "Post deletado com sucesso",
          },
          404: {
            description: "Post não encontrado",
            type: "object",
            properties: {
              status: { type: "string" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    postsController.deletePostByIdController
  );
}
