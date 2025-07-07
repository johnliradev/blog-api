import { repository } from "./repository";
import { Article } from "./types";

export const services = {
  getAll: async (): Promise<Article[]> => {
    return await repository.getAll();
  },
  create: async (title: string, content: string): Promise<Article> => {
    const article = await repository.create(title, content);
    return article;
  },
};
