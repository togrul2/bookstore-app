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
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { LocationHeaderInterceptor } from '../app.interceptor';
import { ErrorEntity } from '../app.entity';
import { ObjectIdValidationPipe } from '../app.pipe';
import { Public } from '../auth/guards/auth.guard';
import { BookEntity } from './entities/book.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/role.enum';

@Controller('books')
@ApiTags('books')
@ApiBearerAuth()
export class BooksController {
  public constructor(private readonly booksService: BooksService) {}

  @ApiCreatedResponse({ type: BookEntity, description: 'Book created' })
  @ApiBadRequestResponse({
    type: ErrorEntity,
    description: 'Bad request',
  })
  @ApiForbiddenResponse({
    type: ErrorEntity,
    description: 'Forbidden',
  })
  @Post()
  @Roles(Role.MODERATOR, Role.LIBRARIAN)
  @UseInterceptors(new LocationHeaderInterceptor('api/v1/books'))
  public async create(
    @Body() createBookDto: CreateBookDto,
  ): Promise<BookEntity> {
    return BookEntity.fromInstance(
      await this.booksService.create(createBookDto),
    );
  }

  @ApiOkResponse({ type: [BookEntity], description: 'Books found' })
  @Public()
  @Get()
  @ApiOkResponse({ type: [BookEntity], description: 'Books found' })
  public async findAll(): Promise<BookEntity[]> {
    return (await this.booksService.findAll()).map(BookEntity.fromInstance);
  }

  @ApiOkResponse({ type: BookEntity, description: 'Book found' })
  @ApiNotFoundResponse({ type: ErrorEntity, description: 'Book not found' })
  @Public()
  @Get(':id')
  public async findOne(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<BookEntity> {
    return BookEntity.fromInstance(await this.booksService.findOne(id));
  }

  @ApiOkResponse({ type: BookEntity, description: 'Book updated' })
  @ApiBadRequestResponse({
    type: ErrorEntity,
    description: 'Bad request',
  })
  @ApiForbiddenResponse({
    type: ErrorEntity,
    description: 'Forbidden',
  })
  @ApiNotFoundResponse({ type: ErrorEntity, description: 'Book not found' })
  @Roles(Role.MODERATOR, Role.LIBRARIAN)
  @Put(':id')
  public async replace(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateBookDto: CreateBookDto,
  ): Promise<BookEntity> {
    return BookEntity.fromInstance(
      await this.booksService.update(id, updateBookDto),
    );
  }

  @ApiOkResponse({ type: BookEntity, description: 'Book updated' })
  @ApiBadRequestResponse({
    type: ErrorEntity,
    description: 'Bad request',
  })
  @ApiForbiddenResponse({
    type: ErrorEntity,
    description: 'Forbidden',
  })
  @ApiNotFoundResponse({ type: ErrorEntity, description: 'Book not found' })
  @Roles(Role.MODERATOR, Role.LIBRARIAN)
  @Patch(':id')
  public async update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookEntity> {
    return BookEntity.fromInstance(
      await this.booksService.update(id, updateBookDto),
    );
  }

  @ApiNoContentResponse({ type: ErrorEntity, description: 'Book deleted' })
  @ApiForbiddenResponse({
    type: ErrorEntity,
    description: 'Forbidden',
  })
  @ApiNotFoundResponse({ type: ErrorEntity, description: 'Book not found' })
  @Roles(Role.MODERATOR, Role.LIBRARIAN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<void> {
    await this.booksService.remove(id);
  }
}
