import { NotFoundError } from "../http/errors/errors";
import { repository } from "./repository";
import { Article, CreateArticleSchema } from "./types";
import { ObjectId } from "@fastify/mongodb";

export const services = {
  getAll: async (): Promise<Article[]> => {
    return await repository.getAll();
  },
  getById: async (id: string): Promise<Article> => {
    const article = await repository.getById(id);
    if (!article) {
      throw new NotFoundError("Article not found");
    }
    return article;
  },
  create: async (data: CreateArticleSchema): Promise<Article> => {
    const article = await repository.create(data);
    return article;
  },
  delete: async (id: string): Promise<void> => {
    const article = await repository.getById(id);
    if (!article) {
      throw new NotFoundError("Article not found");
    }
    return await repository.delete(id);
  },
};
