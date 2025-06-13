import type { FastifyInstance } from "fastify";

export async function router(server: FastifyInstance) {
  server.get("/ping", (request, reply) => {
    reply.code(200).send({ message: "Pong" });
  });
}
