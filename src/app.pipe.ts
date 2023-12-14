import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform<string, string> {
  public transform(value: string): string {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`'${value}' is not a valid ObjectId`);
    }

    return value;
  }
}
