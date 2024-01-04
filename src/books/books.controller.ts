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
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';
import { LocationHeaderInterceptor } from '../app.interceptor';
import { ErrorEntity } from '../app.entity';
import { ObjectIdValidationPipe } from '../app.pipe';
import { Public } from '../auth/auth.guard';

@Controller('books')
@ApiTags('books')
@ApiBearerAuth()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiCreatedResponse({ type: BookEntity, description: 'Book created' })
  @ApiBadRequestResponse({
    type: ErrorEntity,
    description: 'Bad request',
  })
  @Post()
  @UseInterceptors(new LocationHeaderInterceptor('api/v1/books'))
  public async create(
    @Body() createBookDto: CreateBookDto,
  ): Promise<BookEntity> {
    return BookEntity.from(await this.booksService.create(createBookDto));
  }

  @Public()
  @Get()
  @ApiOkResponse({ type: [BookEntity], description: 'Books found' })
  public async findAll(): Promise<BookEntity[]> {
    return (await this.booksService.findAll()).map(BookEntity.from);
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({ type: BookEntity, description: 'Book found' })
  @ApiNotFoundResponse({ type: ErrorEntity, description: 'Book not found' })
  public async findOne(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<BookEntity> {
    return BookEntity.from(await this.booksService.findOne(id));
  }

  @Put(':id')
  @ApiOkResponse({ type: BookEntity, description: 'Book updated' })
  @ApiNotFoundResponse({ type: ErrorEntity, description: 'Book not found' })
  @ApiBadRequestResponse({
    type: ErrorEntity,
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
  @ApiNotFoundResponse({ type: ErrorEntity, description: 'Book not found' })
  @ApiBadRequestResponse({
    type: ErrorEntity,
    description: 'Bad request',
  })
  public async update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookEntity> {
    return BookEntity.from(await this.booksService.update(id, updateBookDto));
  }

  @Delete(':id')
  @ApiNoContentResponse({ type: ErrorEntity, description: 'Book deleted' })
  @ApiNotFoundResponse({ type: ErrorEntity, description: 'Book not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ObjectIdValidationPipe) id: string): Promise<void> {
    return this.booksService.remove(id);
  }
}
