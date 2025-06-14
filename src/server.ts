import fastify from "fastify";
import fastifyPostgres from "@fastify/postgres";
import "dotenv/config";
import { router } from "./route";
import { errorHandler } from "./middlewares/errorHandler";

const PORT = process.env.PORT || 8080;
export const server = fastify({
  logger: true,
});

server.register(fastifyPostgres, {
  connectionString: process.env.DB_URL,
});
server.setErrorHandler(errorHandler);
server.register(router);

server.listen({ port: Number(PORT) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
