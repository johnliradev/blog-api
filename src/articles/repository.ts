import { Article, CreateArticleSchema } from "./types";
import { getArticlesCollection } from "../lib/database";
import { ObjectId } from "@fastify/mongodb";
import { NotFoundError } from "../http/errors/errors";

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
  getById: async (id: string): Promise<Article> => {
    const article = await getArticlesCollection().findOne({
      _id: new ObjectId(id),
    });
    if (!article) {
      throw new NotFoundError("Article not found");
    }
    return {
      id: article._id.toString(),
      title: article.title,
      content: article.content,
      createdAt: article.createdAt,
      tags: article.tags || [],
    };
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
  delete: async (id: string): Promise<void> => {
    await getArticlesCollection().deleteOne({ _id: new ObjectId(id) });
  },
  update: async (id: string, data: CreateArticleSchema): Promise<Article> => {
    await getArticlesCollection().updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: data.title,
          content: data.content,
          tags: data.tags,
        },
      }
    );
    const updated = await getArticlesCollection().findOne({
      _id: new ObjectId(id),
    });
    if (!updated) {
      throw new NotFoundError("Article not found");
    }
    return {
      id: updated._id.toString(),
      title: updated.title,
      content: updated.content,
      createdAt: updated.createdAt,
      tags: updated.tags || [],
    };
  },
};
