import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksRepository } from './books.repository';
import { Book } from './schemas/book.schema';
import { AuthorsRepository } from '../authors/authors.repository';
import { ValidationError } from 'class-validator';

/**
 * Books service to perform CRUD operations on books.
 * @version 1.0.0
 * @since 1.0.0
 * @export
 * @class BooksService
 * @see {@link BooksRepository}
 * @see {@link Book}
 * @see {@link CreateBookDto}
 * @see {@link UpdateBookDto}
 * @see {@link NotFoundException}
 * @example Create a new book
 * const book = await booksService.create(createBookDto);
 */
@Injectable()
export class BooksService {
  public constructor(
    private readonly booksRepository: BooksRepository,
    private readonly authorsRepository: AuthorsRepository,
  ) {}

  private async validateData(createBookDto: CreateBookDto): Promise<void> {
    const errors: ValidationError[] = [];

    if (!(await this.authorsRepository.findOne(createBookDto.author)))
      errors.push({
        property: 'author',
        constraints: {
          isAuthor: 'Author is not found',
        },
      });

    if (await this.booksRepository.existsByTitle(createBookDto.title))
      errors.push({
        property: 'title',
        constraints: {
          isUnique: 'Book with given title already exists',
        },
      });

    if (errors.length) throw new BadRequestException(errors);
  }

  public async create(createBookDto: CreateBookDto): Promise<Book> {
    await this.validateData(createBookDto);
    return this.booksRepository.create(createBookDto);
  }

  public async findAll(): Promise<Book[]> {
    return await this.booksRepository.findAll();
  }

  public async findOne(id: string): Promise<Book> {
    const book = await this.booksRepository.findOne(id);
    if (book === null) throw new NotFoundException();
    return book;
  }

  public async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.booksRepository.update(id, updateBookDto);
    if (book === null) throw new NotFoundException();
    return book;
  }

  public async remove(id: string): Promise<void> {
    if ((await this.booksRepository.remove(id)) === null)
      throw new NotFoundException();
  }
}
