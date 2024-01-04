import {
  Controller,
  Get,
  Post,
  Body,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  NotFoundException,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ObjectIdValidationPipe } from '../app.pipe';
import { AuthorEntity } from './entities/author.entity';
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
import { ErrorEntity } from '../app.entity';
import { LocationHeaderInterceptor } from '../app.interceptor';
import { Public } from '../auth/guards/auth.guard';

/**
 * Controller responsible for handling author CRUD operations.
 * @class
 * @public
 * @version 1.0.0
 * @example
 * // Inject controller (Author module must be imported).
 * constructor(private readonly authorsController: AuthorsController) {}
 * @example
 * // Create author
 * const author = await authorsController.create(dto);
 * @see {@link AuthorsService}
 * @see {@link AuthorEntity}
 * @see {@link CreateAuthorDto}
 * @see {@link UpdateAuthorDto}
 * @see {@link ObjectIdValidationPipe}
 */
@ApiBearerAuth()
@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  /**
   * Creates new author.
   * @public
   * @param {CreateAuthorDto} createAuthorDto - DTO for creating author.
   * @returns {Promise<AuthorEntity>} Created author.
   * @example Creating author
   * const author = await authorsController.create(dto);
   * @see {@link AuthorsService}
   * @see {@link AuthorEntity}
   * @see {@link CreateAuthorDto}
   * @see {@link ObjectIdValidationPipe}
   */
  @ApiCreatedResponse({ type: AuthorEntity, description: 'Created author.' })
  @ApiBadRequestResponse({
    type: ErrorEntity,
    description: 'Bad request.',
  })
  @ApiForbiddenResponse({
    type: ErrorEntity,
    description: 'Forbidden.',
  })
  @Post()
  @UseInterceptors(new LocationHeaderInterceptor('api/v1/authors'))
  public async create(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorEntity> {
    return AuthorEntity.from(await this.authorsService.create(createAuthorDto));
  }

  /**
   * Returns all authors.
   * @public
   * @returns {Promise<AuthorEntity[]>} All authors.
   * @example Get all authors
   * const authors = await authorsController.findAll();
   * @see {@link AuthorsService}
   * @see {@link AuthorEntity}
   * @see {@link CreateAuthorDto}
   * @see {@link ObjectIdValidationPipe}
   */
  @ApiOkResponse({ type: [AuthorEntity], description: 'Fetched authors.' })
  @Get()
  @Public()
  public async findAll(): Promise<AuthorEntity[]> {
    return (await this.authorsService.findAll()).map(AuthorEntity.from);
  }

  /**
   * Returns author by id.
   * @public
   * @param {string} id - Author id.
   * @throws {NotFoundException} Author not found.
   * @returns {Promise<AuthorEntity>} Author.
   * @example Getting author by id
   * const author = await authorsController.findOne(id);
   * @see {@link AuthorsService}
   * @see {@link AuthorEntity}
   * @see {@link CreateAuthorDto}
   * @see {@link ObjectIdValidationPipe}
   * @see {@link NotFoundException}
   */
  @Get(':id')
  @Public()
  @ApiOkResponse({ type: AuthorEntity, description: 'Fetched Author.' })
  @ApiNotFoundResponse({ type: ErrorEntity, description: 'Author not found.' })
  public async findOne(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<AuthorEntity> {
    return AuthorEntity.from(await this.authorsService.findOne(id));
  }

  /**
   * Replaces author by id.
   * @public
   * @param {string} id - Author id.
   * @param {CreateAuthorDto} dto - DTO for replacing author.
   * @throws {NotFoundException} Author not found.
   * @returns {Promise<AuthorEntity>} Replaced author.
   * @example Replacing author by id
   * const author = await authorsController.replace(id, dto);
   * @see {@link AuthorsService}
   * @see {@link AuthorEntity}
   * @see {@link CreateAuthorDto}
   * @see {@link ObjectIdValidationPipe}
   * @see {@link NotFoundException}
   */
  @ApiOkResponse({ type: AuthorEntity, description: 'Replaced author.' })
  @ApiBadRequestResponse({
    type: ErrorEntity,
    description: 'Bad request.',
  })
  @ApiNotFoundResponse({ type: ErrorEntity, description: 'Author not found.' })
  @Put(':id')
  public async replace(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() dto: CreateAuthorDto,
  ): Promise<AuthorEntity> {
    return AuthorEntity.from(await this.authorsService.update(id, dto));
  }

  /**
   * Updates author by id.
   * @public
   * @param {string} id - Author id.
   * @param {UpdateAuthorDto} dto - DTO for updating author.
   * @throws {NotFoundException} Author not found.
   * @returns {Promise<AuthorEntity>} Updated author.
   * @example Updating author by id
   * const author = await authorsController.update(id, dto);
   * @see {@link AuthorsService}
   * @see {@link AuthorEntity}
   * @see {@link UpdateAuthorDto}
   * @see {@link ObjectIdValidationPipe}
   * @see {@link NotFoundException}
   * @see {@link BadRequestErrorDto}
   */
  @ApiOkResponse({ type: AuthorEntity, description: 'Updated author.' })
  @ApiBadRequestResponse({
    type: ErrorEntity,
    description: 'Bad request.',
  })
  @ApiNotFoundResponse({ type: ErrorEntity, description: 'Author not found.' })
  @Patch(':id')
  public async update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() dto: UpdateAuthorDto,
  ): Promise<AuthorEntity> {
    return AuthorEntity.from(await this.authorsService.update(id, dto));
  }

  /**
   * Deletes author by id.
   * @public
   * @param {string} id - Author id.
   * @throws {NotFoundException} Author not found.
   * @returns {Promise<void>} Void.
   * @example Deleting author by id
   * await authorsController.remove(id);
   * @see {@link AuthorsService}
   * @see {@link ObjectIdValidationPipe}
   * @see {@link NotFoundException}
   */
  @ApiNoContentResponse({ description: 'Author deleted.' })
  @ApiNotFoundResponse({ type: ErrorEntity, description: 'Author not found.' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<void> {
    await this.authorsService.remove(id);
  }
}
