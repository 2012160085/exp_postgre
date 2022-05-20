import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import client from '../prismaClient';

class HealthCheckController implements Controller {
  public path = '/config';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.healthCheck);
  }

  private healthCheck = async (request: Request, response: Response, next: NextFunction) => {

    response.send({
      hostname: process.env.HOSTNAME || 'NONE',
      env: process.env.ENV,
      apiVersion: process.env.API_VERSION,
      timezone: process.env.TZ || 'NONE'
    });

  }
}

export default HealthCheckController;
