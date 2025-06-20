import { RequestHandler } from 'express';
import { DataSource } from '../database/connection';
import { z } from 'zod';
import { HttpResponse } from '../utils/HttpResponse';
import User from '../domain/entities/User';

class UserController {
  private readonly repository = DataSource.getRepository(User);

  public create: RequestHandler = async (request, response) => {
    const userSchema = z.object({
      name: z.string(),
      password: z.string()
    });

    const result = userSchema.safeParse(request.body);

    if (!result.success) {
      throw new HttpResponse(400, "Dados inválidos", result.error);
    }

    const { name, password }: z.infer<typeof userSchema> = request.body;

    const user = await this.repository.save({
      name,
      password
    });

    response.send({ message: 'Usuário criado com sucesso', user });
  };

  public update: RequestHandler = async (request, response) => {
    response.send({ message: 'user info updated' });
  };
}

export default UserController;
