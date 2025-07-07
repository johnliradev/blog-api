import { FastifyReply, FastifyRequest } from "fastify";
import { services } from "./services";
import { ValidationError } from "../http/errors/errors";

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
    if (!title || !content) {
      throw new ValidationError("Fields title and content is required");
    }
    if (title.length < 3) {
      throw new ValidationError("Title must be at least 3 characters long");
    }
    if (content.length < 10) {
      throw new ValidationError("Content must be at least 10 characters long");
    }
    const article = await services.create(title, content);
    reply.status(200).send({
      message: "Article created successfully",
      article: article,
    });
  },
};
