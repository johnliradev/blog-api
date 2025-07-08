import { FastifyInstance } from "fastify";
import { controller } from "../../articles/controllers";
import {
  createArticleSchema,
  deleteArticleSchema,
  getAllArticlesSchema,
  getArticleByIdSchema,
  updateArticleSchema,
  getArticlesByDateRangeSchema,
  getArticlesByTagsSchema,
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
    ),
    app.put(
      "/articles/:id",
      { schema: updateArticleSchema },
      controller.update
    );
  app.get(
    "/articles/by-date-range",
    { schema: getArticlesByDateRangeSchema },
    controller.getByDateRange
  );
  app.get(
    "/articles/by-tags",
    { schema: getArticlesByTagsSchema },
    controller.getByTags
  );
};
