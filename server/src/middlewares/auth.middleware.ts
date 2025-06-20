import { RequestHandler } from 'express';
import { HttpResponse } from '../utils/HttpResponse';
import jwt from 'jsonwebtoken';


export const authHandler: RequestHandler = (request, response, next) => {
  const { authorization } = request.headers;
  
  if (!authorization){
    response.status(403).send({ message: 'usuário não autorizado'});
    return;
  }  
  const [, token] = authorization.split(' ');

  if (!process.env.SECRET_KEY) throw new HttpResponse(500 ,'Erro interno', null);
  
  try {
    const isValid = jwt.verify(token, process.env.SECRET_KEY);
    if (isValid) next();
  } catch (error: any) {
    throw new HttpResponse(403, 'Token expirado', null);
  }

  
};
