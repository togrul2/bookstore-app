import { IsNotEmpty, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

/**
 * DTO class for book record (read only).
 */
export class BookDto {
  _id: string;
  title: string;
  author: string;
  publicationYear: number;
}

/**
 * Dto for creating book record.
 */
export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNumber()
  publicationYear: number;
}

/**
 * Dto for updating book record using partial data.
 */
export class UpdateBookDto extends PartialType(CreateBookDto) {}
