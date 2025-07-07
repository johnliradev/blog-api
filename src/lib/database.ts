import { app } from "./fastify";

export const getArticlesCollection = () => {
  return app.mongo.client.db("blog").collection("articles");
};
