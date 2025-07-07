import { FastifyInstance } from "fastify";
import { controller } from "../articles/controllers";

export const Router = (app: FastifyInstance) => {
  app.get("/articles", controller.getAll);
  app.post("/articles", controller.create);
};
