import { Article } from "./types";
import { getArticlesCollection } from "../lib/database";

export const repository = {
  getAll: async (): Promise<Article[]> => {
    const articles = await getArticlesCollection().find().toArray();
    return articles.map((a) => ({
      id: a._id.toString(),
      title: a.title,
      content: a.content,
    }));
  },
  create: async (title: string, content: string): Promise<Article> => {
    const article = await getArticlesCollection().insertOne({
      title: title,
      content: content,
    });
    return {
      id: article.insertedId.toString(),
      title: title,
      content: content,
    };
  },
};
