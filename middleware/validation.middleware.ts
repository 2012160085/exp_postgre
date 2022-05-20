import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '../exceptions/HttpException';
import { objToString } from '../utils/objToString';

function validationMiddleware<T>(type: any, skipMissingProperties = false): RequestHandler {
  return (req, res, next) => {
    const aa = plainToInstance(type, req.body)

    validate(plainToInstance(type, req.body), { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => objToString(error.constraints)).join()
          next(new HttpException(400, message));
        } else {
          next();
        }
      });
  };
}

export default validationMiddleware;
