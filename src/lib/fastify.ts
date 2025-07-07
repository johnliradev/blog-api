import fastify from "fastify";
import cors from "@fastify/cors";
import mongodb from "@fastify/mongodb";
import "dotenv/config";
import { Router } from "../http/routes";
import { errorHandler } from "../http/errors/errorHandler";

const app = fastify({ logger: true });

app.setErrorHandler(errorHandler);
app.register(cors, { origin: "*" });
app.register(mongodb, {
  forceClose: true,
  url: process.env.MONGODB_URI,
});
app.register(Router, { prefix: "/api" });

export { app };
