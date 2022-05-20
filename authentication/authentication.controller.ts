import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction, Router } from 'express';
import client from '../prismaClient';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../user/user.dto';
import AuthenticationService from './authentication.service';
import LogInDto from './logIn.dto';
import UsernameNotFoundException from '../exceptions/UsernameNotFoundException';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = Router();
  public authenticationService = new AuthenticationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration);
    this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.loggingIn);
  }

  private registration = async (request: Request, response: Response, next: NextFunction) => {

    const userData: CreateUserDto = request.body;
    try {
      const {
        tokenData,
        user
      } = await this.authenticationService.register(userData);
      response.send(tokenData);
    } catch (error) {
      next(error);
    }
  }

  private loggingIn = async (request: Request, response: Response, next: NextFunction) => {
    const logInData: LogInDto = request.body;
    const user = await client.user.findUnique({
      where: {
        username: logInData.username
      }
    })
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        user.password,
      );
      if (isPasswordMatching) {
        const tokenData = this.authenticationService.createToken (user);
        response.send(tokenData);
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new UsernameNotFoundException());
    }
  }

}

export default AuthenticationController;
