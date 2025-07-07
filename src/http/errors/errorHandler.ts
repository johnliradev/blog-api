import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "./errors";

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  request.log.error(error);

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      error: true,
      message: error.message,
    });
  }

  if (error.validation) {
    return reply.status(400).send({
      error: true,
      message: "Validation error",
      details: error.validation,
    });
  }
};
