import { FastifyInstance } from "fastify";
import { controller } from "../../articles/controllers";
import { createArticleSchema, getAllArticlesSchema } from "./schemas";

export const Router = (app: FastifyInstance) => {
  app.get("/articles", { schema: getAllArticlesSchema }, controller.getAll);
  app.post("/articles", { schema: createArticleSchema }, controller.create);
};
