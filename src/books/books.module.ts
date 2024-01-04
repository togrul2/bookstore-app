import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { Book, BookSchema } from './books.schema';

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
