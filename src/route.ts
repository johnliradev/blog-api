import type { FastifyInstance } from "fastify";
import postsRouter from "./modules/posts/posts.route";

export async function router(server: FastifyInstance) {
  server.register(postsRouter, { prefix: "/posts" });
  server.get(
    "/",
    {
      schema: {
        tags: ["inicio"],
        summary: "Rota inicial",
        description: "Rota inicial",
        response: {
          200: {
            description:
              "Rota inicial da API de posts. Acesse a rota /docs para ter mais informações.",
          },
        },
      },
    },
    (request, reply) => {
      reply.code(200).send({
        message:
          "Rota inicial da API de posts. Acesse a rota /docs para ter mais informações.",
      });
    }
  );
}
