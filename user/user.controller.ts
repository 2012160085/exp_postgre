import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import client from '../prismaClient';

class UserController implements Controller {
  public path = '/users';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:id`, authMiddleware, this.getUserById);
  }

  private getUserById = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.body.id
    const user = await client.user.findUnique({
      where:{
        id
      }
    });
    if (user) {
      response.send(user);
    } else {
      next(new UserNotFoundException(id));
    }
  }
}

export default UserController;
