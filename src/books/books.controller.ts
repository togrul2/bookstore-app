import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './book.serializer';
import { LocationHeaderInterceptor } from '../app.interceptor';
import { BadRequestErrorDto, ErrorDto } from '../app.dto';
import { ObjectIdValidationPipe } from '../app.pipe';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseInterceptors(new LocationHeaderInterceptor('api/v1/books'))
  @ApiCreatedResponse({ type: BookEntity, description: 'Book created' })
  @ApiBadRequestResponse({
    type: BadRequestErrorDto,
    description: 'Bad request',
  })
  public async create(
    @Body() createBookDto: CreateBookDto,
  ): Promise<BookEntity> {
    return BookEntity.from(await this.booksService.create(createBookDto));
  }

  @Get()
  @ApiOkResponse({ type: [BookEntity], description: 'Books found' })
  public async findAll(): Promise<BookEntity[]> {
    return (await this.booksService.findAll()).map(BookEntity.from);
  }

  @Get(':id')
  @ApiNotFoundResponse({ type: ErrorDto, description: 'Book not found' })
  @ApiOkResponse({ type: BookEntity, description: 'Book found' })
  public async findOne(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<BookEntity> {
    return BookEntity.from(await this.booksService.findOne(id));
  }

  @Put(':id')
  @ApiOkResponse({ type: BookEntity, description: 'Book updated' })
  @ApiNotFoundResponse({ type: ErrorDto, description: 'Book not found' })
  @ApiBadRequestResponse({
    type: BadRequestErrorDto,
    description: 'Bad request',
  })
  public async replace(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateBookDto: CreateBookDto,
  ): Promise<BookEntity> {
    return BookEntity.from(await this.booksService.update(id, updateBookDto));
  }

  @Patch(':id')
  @ApiOkResponse({ type: BookEntity, description: 'Book updated' })
  @ApiNotFoundResponse({ type: ErrorDto, description: 'Book not found' })
  @ApiBadRequestResponse({
    type: BadRequestErrorDto,
    description: 'Bad request',
  })
  public async update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookEntity> {
    return BookEntity.from(await this.booksService.update(id, updateBookDto));
  }

  @Delete(':id')
  @ApiNoContentResponse({ type: ErrorDto, description: 'Book deleted' })
  @ApiNotFoundResponse({ type: ErrorDto, description: 'Book not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ObjectIdValidationPipe) id: string): Promise<void> {
    return this.booksService.remove(id);
  }
}
