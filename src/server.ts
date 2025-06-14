import fastify from "fastify";
import fastifyPostgres from "@fastify/postgres";
import "dotenv/config";
import { router } from "./route";
import { errorHandler } from "./middlewares/errorHandler";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { swaggerOptions, swaggerUiOptions } from "./config/swagger";

const PORT = process.env.PORT || 8080;
export const server = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(fastifySwagger, swaggerOptions);
server.register(fastifySwaggerUi, swaggerUiOptions);

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
