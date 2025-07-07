import { FastifyReply, FastifyRequest } from "fastify";
import { services } from "./services";

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
    const { title, content } = request.body as {
      title: string;
      content: string;
    };
    const article = await services.create(title, content);
    reply.status(200).send({
      message: "Article created successfully",
      article: article,
    });
  },
};
