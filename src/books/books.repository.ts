import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ModifyResult } from 'mongoose';
import { Book } from './schemas/book.schema';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';

/**
 * MongoDB Repository for book resource.
 * @class
 * @public
 * @name BooksRepository
 * @version 1.0.0
 * @see {@link Book}
 * @see {@link BooksService}
 * @see {@link BooksController}
 * @see {@link BooksModule}
 * @see {@link https://docs.nestjs.com/techniques/mongodb}
 */
@Injectable()
export class BooksRepository {
  public constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  public async create(book: CreateBookDto): Promise<Book> {
    return new this.bookModel(book, '-__v').save();
  }

  public async findAll(): Promise<Book[]> {
    return this.bookModel
      .find()
      .populate('author')
      .select('-__v')
      .lean()
      .exec();
  }

  public async findOne(id: string): Promise<Book | null> {
    return this.bookModel
      .findById(id)
      .populate('author')
      .select('-__v')
      .lean()
      .exec();
  }

  public async existsByTitle(title: string, id?: string): Promise<boolean> {
    return !!(await this.bookModel.exists({ title, _id: { $ne: id } }).exec());
  }

  public async update(id: string, book: UpdateBookDto): Promise<Book | null> {
    return this.bookModel
      .findByIdAndUpdate(id, book, { new: true })
      .populate('author')
      .select('-__v')
      .lean()
      .exec();
  }

  public async remove(id: string): Promise<ModifyResult<Book>> {
    return this.bookModel.findByIdAndDelete(id).exec();
  }
}
