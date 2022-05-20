import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';


class HealthCheckController implements Controller {
  public path = '/health-check';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.healthCheck);
  }

  private healthCheck = async (request: Request, response: Response, next: NextFunction) => {

    response.send({
      'status' : 'good'
    });

  }
}

export default HealthCheckController;
