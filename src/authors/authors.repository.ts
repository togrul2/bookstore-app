import { InjectModel } from '@nestjs/mongoose';
import { Author } from './entities/author.entity';
import { Model, ModifyResult } from 'mongoose';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Injectable } from '@nestjs/common';

/**
 * MongoDB Repository for authors.
 * @class
 * @public
 * @name AuthorsRepository
 * @version 1.0.0
 * @see {@link Author}
 * @see {@link AuthorsService}
 * @see {@link AuthorsController}
 * @see {@link AuthorsModule}
 * @see {@link https://docs.nestjs.com/techniques/mongodb}
 */
@Injectable()
export class AuthorsRepository {
  public constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
  ) {}

  public async create(dto: CreateAuthorDto): Promise<Author> {
    return new this.authorModel(dto, ['-__v']).save();
  }

  public async findAll(): Promise<Author[]> {
    return this.authorModel.find().select(['-__v']).exec();
  }

  public async findOne(id: string): Promise<Author | null> {
    return this.authorModel.findById(id).select(['-__v']).exec();
  }

  public async update(
    id: string,
    dto: UpdateAuthorDto,
  ): Promise<Author | null> {
    return this.authorModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
  }

  public async delete(id: string): Promise<ModifyResult<Author>> {
    return this.authorModel.findByIdAndDelete(id);
  }
}
