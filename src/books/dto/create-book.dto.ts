import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Validate,
  ValidatorConstraint,
} from 'class-validator';
import { Types } from 'mongoose';

@ValidatorConstraint({ name: 'ObjectId', async: false })
class ObjectIdValidator {
  public validate(id: string): boolean {
    return Types.ObjectId.isValid(id);
  }
}

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  @Validate(ObjectIdValidator, { message: 'Author must be a valid ObjectId' })
  author!: string;

  @IsNumber()
  @IsNotEmpty()
  @Max(new Date().getFullYear())
  publicationYear!: number;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  tags!: string[];
}
