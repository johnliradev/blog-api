import { FastifyInstance } from "fastify";
import * as postsController from "./posts.controller";
import {
  GetPostByIdParamsSchema,
  GetPostByIdResponseSchema,
  GetPostsResponseSchema,
  PostPostResponseSchema,
} from "./posts.schema";

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
            ...GetPostsResponseSchema,
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
        params: GetPostByIdParamsSchema,
        response: {
          200: {
            description: "Post encontrado",
            ...GetPostByIdResponseSchema,
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
        body: {
          type: "object",
          required: ["title", "content", "author_name"],
          properties: {
            title: { type: "string" },
            content: { type: "string" },
            author_name: { type: "string" },
          },
        },
        response: {
          201: {
            description: "Post criado com sucesso",
            ...PostPostResponseSchema,
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
}
