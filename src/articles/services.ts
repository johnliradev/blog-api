import { repository } from "./repository";
import { Article, CreateArticleSchema } from "./types";

export const services = {
  getAll: async (): Promise<Article[]> => {
    return await repository.getAll();
  },
  create: async (data: CreateArticleSchema): Promise<Article> => {
    const article = await repository.create(data);
    return article;
  },
};
