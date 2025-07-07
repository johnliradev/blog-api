import { FastifyReply, FastifyRequest } from "fastify";
import { services } from "./services";
import { CreateArticleSchema } from "./types";

export const controller = {
  getAll: async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> => {
    const articles = await services.getAll();
    reply.status(200).send({
      articles: articles,
    });
  },
  create: async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> => {
    const { title, content, tags } = request.body as CreateArticleSchema;
    const article = await services.create({ title, content, tags });
    reply.status(201).send({
      message: "Article created successfully",
      article: article,
    });
  },
};
