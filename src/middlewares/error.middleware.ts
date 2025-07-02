import { ErrorRequestHandler } from 'express';
import { HttpErrorResponse } from '../utils/HttpErrorResponse';

// middleware para tratamento de erros dos controllers
export const errorHandler: ErrorRequestHandler = (error: any, request, response, next) => {
  const statusCode = error instanceof HttpErrorResponse && error.statusCode ? error.statusCode : 500;
  const message = error.message || 'Erro interno do servidor';
  const data = error.data || null;

  console.error('Erro tratado:', error);

  response.status(statusCode).send({ message, data });
};
