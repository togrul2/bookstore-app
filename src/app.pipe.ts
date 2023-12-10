import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'mongodb';

/**
 * Defines the pipe for MongoDB ObjectID validation and transformation
 */
@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, ObjectId> {
  /**
   * Validates and transforms a value to a MongoDB ObjectID
   *
   * @remarks
   * Throws a ArgumentException if the validation fails
   *
   * @param value - The value to validate and transform
   * @returns The MongoDB ObjectID
   */
  public transform(value: any): ObjectId {
    try {
      return ObjectId.createFromHexString(value);
    } catch (error) {
      throw new BadRequestException(
        `Validation failed ('${value}' cannot be parse to ObjectId).`,
      );
    }
  }
}
