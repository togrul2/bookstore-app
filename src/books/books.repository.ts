import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ModifyResult } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './books.schema';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  public async create(book: Book): Promise<Book> {
    return new this.bookModel(book).save();
  }

  public async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  public async findOne(id: string): Promise<Book | null> {
    return this.bookModel.findById(id).exec();
  }

  public async update(
    id: string,
    book: Partial<CreateBookDto>,
  ): Promise<Book | null> {
    return this.bookModel.findByIdAndUpdate(id, book, { new: true });
  }

  public async remove(id: string): Promise<ModifyResult<Book>> {
    return this.bookModel.findByIdAndDelete(id);
  }
}
