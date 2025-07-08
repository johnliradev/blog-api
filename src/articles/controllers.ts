import { FastifyReply, FastifyRequest } from "fastify";
import { services } from "./services";
import { CreateArticleSchema } from "./types";
import { ValidationError } from "../http/errors/errors";
import { ObjectId } from "@fastify/mongodb";

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
  getById: async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> => {
    const { id } = request.params as { id: string };
    if (!id) {
      throw new ValidationError("ID must be inserted in URL");
    }
    if (!ObjectId.isValid(id)) {
      throw new ValidationError("Invalid article ID format");
    }
    const article = await services.getById(id);
    reply.status(200).send({
      article,
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
  delete: async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> => {
    const { id } = request.params as { id: string };
    if (!id) {
      throw new ValidationError("ID must be inserted in URL");
    }
    if (!ObjectId.isValid(id)) {
      throw new ValidationError("Invalid article ID format");
    }
    await services.delete(id);
    reply.status(200).send({
      message: "Article deleted successfully",
    });
  },
  update: async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> => {
    const { id } = request.params as { id: string };
    if (!id) {
      throw new ValidationError("ID must be inserted in URL");
    }
    if (!ObjectId.isValid(id)) {
      throw new ValidationError("Invalid article ID format");
    }
    const { title, content, tags } = request.body as CreateArticleSchema;
    const article = await services.update(id, { title, content, tags });
    reply.status(201).send({
      message: "Article updated successfully",
      article: article,
    });
  },
};
