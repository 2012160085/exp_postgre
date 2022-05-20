import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import client from '../prismaClient';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import RequestWithUser from '../interfaces/requestWithUser.interface';


async function debugMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  response.append('Debug-Environment', process.env.ENV)
  response.append('Debug-Timezone', process.env.TZ)
  response.append('Debug-Api-Version', process.env.API_VERSION)
  response.append('Debug-Hostname', process.env.HOSTNAME)
  next();
}


export default debugMiddleware;
