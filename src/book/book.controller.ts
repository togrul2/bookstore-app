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
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto, CreateBookDto, UpdateBookDto } from './books.dto';
import { Response } from 'express';
import { Book } from './book.schema';
import { ObjectId } from 'mongodb';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestErrorDto, ErrorDto } from '../app.dto';

@ApiTags('book')
@Controller('api/books')
export class BookController {
  constructor(private readonly booksService: BookService) {}

  @Get()
  @ApiOkResponse({ type: [BookDto], description: 'Books found' })
  public async findAll(): Promise<Book[]> {
    return await this.booksService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse({ type: ErrorDto, description: 'Book not found' })
  @ApiOkResponse({ type: BookDto, description: 'Book found' })
  public findById(@Param('id') id: ObjectId): Promise<Book> {
    return this.booksService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: BookDto, description: 'Book created' })
  @ApiBadRequestResponse({
    type: BadRequestErrorDto,
    description: 'Bad request',
  })
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
  @ApiOkResponse({ type: BookDto, description: 'Book updated' })
  @ApiNotFoundResponse({ type: ErrorDto, description: 'Book not found' })
  @ApiBadRequestResponse({
    type: BadRequestErrorDto,
    description: 'Bad request',
  })
  public updateBook(
    @Param('id') id: ObjectId,
    @Body() bookDto: CreateBookDto,
  ): Promise<Book> {
    return this.booksService.updateBook(id, bookDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BookDto, description: 'Book updated' })
  @ApiNotFoundResponse({ type: ErrorDto, description: 'Book not found' })
  @ApiBadRequestResponse({
    type: BadRequestErrorDto,
    description: 'Bad request',
  })
  public partiallyUpdateBook(
    @Param('id') id: ObjectId,
    @Body() bookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.updateBook(id, bookDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({ type: ErrorDto, description: 'Book deleted' })
  @ApiNotFoundResponse({ type: ErrorDto, description: 'Book not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteBook(@Param('id') id: ObjectId): Promise<void> {
    await this.booksService.deleteBook(id);
  }
}
