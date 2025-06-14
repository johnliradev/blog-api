import { SwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";

export const swaggerOptions: SwaggerOptions = {
  swagger: {
    info: {
      title: "Blog API",
      description: "API de blog com Fastify",
      version: "1.0.0",
    },
    host: "localhost:8080",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [{ name: "posts", description: "Endpoints relacionados a posts" }],
  },
};

export const swaggerUiOptions: FastifySwaggerUiOptions = {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
  staticCSP: true,
};
