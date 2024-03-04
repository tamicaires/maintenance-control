import {
  isDate,
  registerDecorator,
  ValidationArguments, 
  ValidationOptions
} from 'class-validator';
import { ExceptionMessage } from '../data/exceptionMessage';

export function IsDateCustom(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'IsDateCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {

        validate(value: string) {
          return isDate(value)
        },
        defaultMessage(validationArguments: ValidationArguments){
          return ExceptionMessage.IsDate(validationArguments.property);
        }
      },
    });
  };
};