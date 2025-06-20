import { RequestHandler } from 'express';

export const authHandler: RequestHandler = (request, response, next) => {
  // console.log('Authenticated route');
  next()
};
