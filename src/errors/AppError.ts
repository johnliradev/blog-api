//Erro geral na aplicação
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 400, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Erros para os Posts
export class PostNotFoundError extends AppError {
  constructor(message: string = "Post não encontrado") {
    super(message, 404);
  }
}

export class PostValidationError extends AppError {
  constructor(message: string = "Dados do post inválidos") {
    super(message, 400);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = "Erro no banco de dados") {
    super(message, 500);
  }
}
