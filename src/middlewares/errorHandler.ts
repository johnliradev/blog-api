import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../errors/AppError";

export async function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  //Log do erro
  console.error("Error", {
    message: error.message,
    stack: error.stack,
    path: request.url,
    method: request.method,
  });
  // Se for erro da aplicação
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      status: "error",
      message: error.message,
    });
  }
  // Erro não tratado
  return reply.status(500).send({
    status: "error",
    message: "Erro interno do servidor",
  });
}
