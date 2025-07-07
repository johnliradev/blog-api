import { Article, CreateArticleSchema } from "./types";
import { getArticlesCollection } from "../lib/database";

export const repository = {
  getAll: async (): Promise<Article[]> => {
    const articles = await getArticlesCollection().find().toArray();
    return articles.map((a) => ({
      id: a._id.toString(),
      title: a.title,
      content: a.content,
      createdAt: a.createdAt,
      tags: a.tags || [],
    }));
  },
  create: async (data: CreateArticleSchema): Promise<Article> => {
    const now = new Date();
    const article = await getArticlesCollection().insertOne({
      title: data.title,
      content: data.content,
      tags: data.tags || [],
      createdAt: now,
    });
    return {
      id: article.insertedId.toString(),
      title: data.title,
      content: data.content,
      createdAt: now,
      tags: data.tags || [],
    };
  },
};
