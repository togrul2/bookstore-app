import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorsRepository } from './authors.repository';
import {Author} from './entities/author.entity';


/**
 * Service responsible for handling author CRUD operations.
 * @class
 * @public
 * @version 1.0.0
 * @property {AuthorsRepository} authorRepository - Instance of authors repository.
 * @example
 * // Inject service (Author module must be imported).
 * constructor(private readonly authorsService: AuthorsService) {}
 * @example
 * // Create author
 * const author = await authorsService.create(dto);
 */
@Injectable()
export class AuthorsService {
  constructor(private readonly authorRepository: AuthorsRepository) {}

  /**
   * Creates new author.
   * @public
   * @param {CreateAuthorDto} dto - DTO for creating author.
   * @returns {Promise<AuthorEntity>} Created author.
   * @example Creating author
   * const author = await authorsService.create(dto);
   * @see {@link AuthorsRepository}
   * @see {@link Author}
   * @see {@link CreateAuthorDto}
   */
  public async create(dto: CreateAuthorDto): Promise<Author> {
    return this.authorRepository.create(dto);
  }

  /**
   * Finds all authors.
   * @public
   * @returns {Promise<Author[]>} Found authors.
   * @example Finding authors
   * const authors = await authorsService.findAll();
   * @see {@link AuthorsRepository}
   * @see {@link Author}
   */
  public async findAll(): Promise<Author[]> {
    return this.authorRepository.findAll();
  }

  /**
   * Finds author by id.
   * @public
   * @param {string} id - ID of author to find.
   * @returns {Promise<AuthorEntity>} Found author.
   * @throws {NotFoundException} Author not found.
   * @example Finding author
   * const author = await authorsService.findOne(id);
   * @see {@link AuthorsRepository}
   * @see {@link Author}
   */
  public async findOne(id: string): Promise<Author> {
    const author = await this.authorRepository.findOne(id);
    if (author === null) throw new NotFoundException();
    return author;
  }

  /**
   * Updates author by id.
   * @public
   * @param {string} id - ID of author to update.
   * @param {UpdateAuthorDto} dto - DTO for updating author.
   * @returns {Promise<AuthorEntity>} Updated author.
   * @throws {NotFoundException} Author not found.
   * @example Updating author
   * const author = await authorsService.update(id, dto);
   * @see {@link AuthorsRepository}
   * @see {@link Author}
   */
  public async update(id: string, dto: UpdateAuthorDto): Promise<Author> {
    const author = await this.authorRepository.update(id, dto);
    if (author === null) throw new NotFoundException();
    return author;
  }

  /**
   * Removes author by id.
   * @public
   * @param {string} id - ID of author to remove.
   * @throws {NotFoundException} Author not found.
   * @see {@link AuthorsRepository}
   * @example Removing author
   * await authorsService.remove(id);
   * @see {@link AuthorsRepository}
   * @see {@link Author}
   */
  public async remove(id: string): Promise<void> {
    if (!(await this.authorRepository.delete(id)))
      throw new NotFoundException();
  }
}
