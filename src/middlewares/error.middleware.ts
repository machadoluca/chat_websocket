import { ErrorRequestHandler } from 'express';
import { HttpErrorResponse } from '../utils/HttpErrorResponse';

export const errorHandler: ErrorRequestHandler = (error: HttpErrorResponse, request, response, next) => {
  response.status(error.statusCode).send({ message: error.message, data: error.data });
};

