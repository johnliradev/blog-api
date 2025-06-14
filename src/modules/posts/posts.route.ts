import { FastifyInstance } from "fastify";
import * as postsController from "./posts.controller";

export default function postsRouter(server: FastifyInstance) {
  server.get("/", postsController.getAllPostsController);
}
