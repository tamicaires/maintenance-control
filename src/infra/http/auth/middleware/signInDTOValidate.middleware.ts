import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SignInBody } from '../dtos/SignInBody';
import { validate } from 'class-validator';
import { IncorrectValuesException } from 'src/core/exceptions/IncorrectValuesExceptions';
import { mapperClassValidationErrorToAppException } from 'src/shared/utils/mappers';

@Injectable()
export class signInDTOValidateMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const signInBody = new SignInBody();
    signInBody.email = body.email;
    signInBody.password = body.password;

    const validations = await validate(signInBody);

    if (validations.length) {
      throw new IncorrectValuesException({
        fields: mapperClassValidationErrorToAppException(validations),
      });
    }

    next();
  }
}
