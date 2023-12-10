import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/books.dto.create';
import { Response } from 'express';
import { Book } from './book.schema';
import { ObjectId } from 'mongodb';
import { ParseObjectIdPipe } from '../app.pipe';

@Controller('/books')
export class BookController {
  constructor(private readonly booksService: BookService) {}

  @Get()
  public async findAll(): Promise<Book[]> {
    return await this.booksService.findAll();
  }

  @Get(':id')
  public findById(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<Book> {
    return this.booksService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async createBook(
    @Res() res: Response,
    @Body() book: CreateBookDto,
  ): Promise<Response> {
    const createdBook = await this.booksService.createBook(book);
    return res
      .setHeader('Location', `/books/${createdBook.title}`)
      .json(createdBook);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  public updateBook(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body() bookDto: CreateBookDto,
  ): Promise<Book> {
    return this.booksService.updateBook(id, bookDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  public partiallyUpdateBook(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body() bookDto: Partial<CreateBookDto>,
  ): Promise<Book> {
    return this.booksService.updateBook(id, bookDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteBook(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
  ): Promise<void> {
    await this.booksService.deleteBook(id);
  }
}
