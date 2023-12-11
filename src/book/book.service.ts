import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './books.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './book.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class BookService {
  public constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  public async findAll(): Promise<Book[]> {
    return await this.bookModel.find().select(['-__v']).exec();
  }

  public async createBook(dto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(dto, ['-__v']);
    return await createdBook.save();
  }

  public async findById(id: ObjectId): Promise<Book> {
    const book = await this.bookModel.findById(id).select(['-__v']);

    if (book === null) {
      throw new NotFoundException('Book not found.');
    }

    return book;
  }

  public async updateBook(
    id: ObjectId,
    dto: Partial<CreateBookDto>,
  ): Promise<Book> {
    const book = await this.bookModel
      .findByIdAndUpdate(id, dto, { new: true })
      .select(['-__v']);

    if (book === null) {
      throw new NotFoundException('Book not found!');
    }

    return book;
  }

  public async deleteBook(id: ObjectId): Promise<void> {
    if ((await this.bookModel.findById(id).exec()) == null) {
      throw new NotFoundException('Book not found');
    }

    await this.bookModel.findByIdAndDelete(id);
  }
}
