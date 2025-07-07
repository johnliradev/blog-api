import { FastifyInstance } from "fastify";
import { controller } from "../../articles/controllers";
import {
  createArticleSchema,
  deleteArticleSchema,
  getAllArticlesSchema,
  getArticleByIdSchema,
} from "./schemas";

export const Router = (app: FastifyInstance) => {
  app.get("/articles", { schema: getAllArticlesSchema }, controller.getAll);
  app.post("/articles", { schema: createArticleSchema }, controller.create);
  app.get(
    "/articles/:id",
    { schema: getArticleByIdSchema },
    controller.getById
  ),
    app.delete(
      "/articles/:id",
      { schema: deleteArticleSchema },
      controller.delete
    );
};
