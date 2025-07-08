import fastify from "fastify";
import cors from "@fastify/cors";
import mongodb from "@fastify/mongodb";
import "dotenv/config";
import { Router } from "../http/routes/routes";
import { errorHandler } from "../http/errors/errorHandler";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

const app = fastify({ logger: true });

app.setErrorHandler(errorHandler);
app.register(cors, { origin: "*" });
app.register(mongodb, {
  forceClose: true,
  url: process.env.MONGODB_URI,
});
// Swagger docs
app.register(swagger, {
  openapi: {
    info: {
      title: "Blog API",
      description: "Documentação da API de artigos de blog",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:3000/api" }],
  },
});
app.register(swaggerUi, {
  routePrefix: "/docs",
});
app.register(Router, { prefix: "/api" });

export { app };
