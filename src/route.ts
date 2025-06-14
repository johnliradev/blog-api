import type { FastifyInstance } from "fastify";
import postsRouter from "./modules/posts/posts.route";

export async function router(server: FastifyInstance) {
  server.register(postsRouter, { prefix: "/posts" });
  server.get("/ping", (request, reply) => {
    reply.code(200).send({ message: "Pong" });
  });
}
