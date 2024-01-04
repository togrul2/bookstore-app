import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksRepository } from './books.repository';
import { Book } from './books.schema';

@Injectable()
export class BooksService {
  public constructor(private readonly booksRepository: BooksRepository) {}

  public async create(createBookDto: CreateBookDto): Promise<Book> {
    return this.booksRepository.create(createBookDto);
  }

  public async findAll(): Promise<Book[]> {
    return this.booksRepository.findAll();
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
