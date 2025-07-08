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
  getByDateRange: async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> => {
    const { start, end } = request.query as { start: string; end: string };
    if (!start || !end) {
      throw new ValidationError(
        "Both start and end dates must be provided as query parameters"
      );
    }
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new ValidationError("Invalid date format for start or end");
    }
    const articles = await services.getByDataRange(startDate, endDate);
    reply.status(200).send({
      articles,
    });
  },
  getByTags: async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> => {
    const { tags } = request.query as { tags: string };
    if (!tags) {
      throw new ValidationError(
        "Tags must be provided as a comma-separated list in the query string"
      );
    }
    const tagsArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (tagsArray.length === 0) {
      throw new ValidationError("At least one tag must be provided");
    }
    const articles = await services.getByTags(tagsArray);
    reply.status(200).send({ articles });
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
