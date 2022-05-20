import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import client from '../prismaClient';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import RequestWithUser from '../interfaces/requestWithUser.interface';


async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const token = request.headers.token as string;
  if (token) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(token, secret) as DataStoredInToken;
      const id = verificationResponse.userId;
      const user = await client.user.findUnique({
        where:{
          id
        }
      });
      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;
