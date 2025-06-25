import { RequestHandler } from 'express';
import { z } from 'zod';
import { compare, hash } from 'bcrypt';
import { DataSource } from '../database/connection';
import { HttpErrorResponse } from '../utils/HttpErrorResponse';
import User from '../domain/entities/User';
import jwt from 'jsonwebtoken';

class UserController {
  private readonly repository = DataSource.getRepository(User);

  public create: RequestHandler = async (request, response) => {
    const userSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string()
    });

    const result = userSchema.safeParse(request.body);

    if (!result.success) {
      throw new HttpErrorResponse(400, "Dados inválidos", result.error);
    }

    const { name, password, email }: z.infer<typeof userSchema> = request.body;


    const hashPassword = await hash(password, 10);
    const user = await this.repository.save({
      name,
      email,
      password: hashPassword
    });

    response.send({ message: 'Usuário criado com sucesso', user });
  };
  
  public login: RequestHandler = async (request, response) => {
    const userSchema = z.object({
      email: z.string().email(),
      password: z.string()
    });

    const result = userSchema.safeParse(request.body);

    if (!result.success) {
      throw new HttpErrorResponse(400, 'Dados inválidos', result.error);
    }

    const { email, password }: z.infer<typeof userSchema> = request.body;

    const user = await this.repository.findOne({
      where: {
        email,
      }
    });

    if (!user) throw new HttpErrorResponse(400 ,'Usuário não encontrado', null);
      
    const comparePassword = await compare(password, user.password);
    
    if (!comparePassword) throw new HttpErrorResponse(400 ,'Dados do usuário incorretos', null);
      
    if (!process.env.SECRET_KEY) throw new HttpErrorResponse(500 ,'Erro interno', null);

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '4m' });

    response.send({message: 'sucesso',token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email
    }
});

  };

  public update: RequestHandler = async (request, response) => {
    response.send({ message: 'user info updated' });
  };
}

export default UserController;
