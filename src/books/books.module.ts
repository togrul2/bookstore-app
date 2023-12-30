import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { Book, BookSchema } from './entities/book.entity';

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
  imports: [
    MongooseModule.forFeatureAsync([
      { name: Book.name, useFactory: () => BookSchema },
    ]),
  ],
})
export class BooksModule {}
