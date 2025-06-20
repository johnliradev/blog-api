import fastify from "fastify";
import fastifyPostgres from "@fastify/postgres";
import "dotenv/config";
import { router } from "./route";
import { errorHandler } from "./middlewares/errorHandler";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { swaggerOptions, swaggerUiOptions } from "./config/swagger";
import pino from "pino";
import { requestLogger } from "./middlewares/requestLogger";

const PORT = process.env.PORT || 8080;
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
});
export const server = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(fastifySwagger, swaggerOptions);
server.register(fastifySwaggerUi, swaggerUiOptions);
server.register(fastifyCors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
});
server.register(fastifyPostgres, {
  connectionString: process.env.DB_URL,
});
server.setErrorHandler(errorHandler);
server.addHook("onRequest", requestLogger);
server.register(router);

server.listen({ port: Number(PORT) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
