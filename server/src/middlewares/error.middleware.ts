import { ErrorRequestHandler } from 'express';
import { HttpResponse } from '../utils/HttpResponse';

export const errorHandler: ErrorRequestHandler = (error: HttpResponse, request, response, next) => {
  response.status(error.statusCode).send({ message: error.message, data: error.data });
};

