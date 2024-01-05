import { InjectModel } from '@nestjs/mongoose';
import { Author } from './schemas/author.schema';
import { Model, ModifyResult } from 'mongoose';
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

  public async create(dto: Partial<Author>): Promise<Author> {
    return new this.authorModel(dto, '-__v', { lean: true }).save();
  }

  public async findAll(): Promise<Author[]> {
    return this.authorModel.find().select('-__v').lean().exec();
  }

  public async findOne(id: string): Promise<Author | null> {
    return this.authorModel.findById(id).select('-__v').lean().exec();
  }

  public async update(
    id: string,
    dto: Partial<Author>,
  ): Promise<Author | null> {
    return this.authorModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .lean()
      .exec();
  }

  public async delete(id: string): Promise<ModifyResult<Author>> {
    return this.authorModel.findByIdAndDelete(id).exec();
  }
}
