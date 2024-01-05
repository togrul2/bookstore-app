import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { Book, BookSchema } from './schemas/book.schema';
import { AuthorsModule } from '../authors/authors.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
  imports: [
    AuthorsModule,
    MongooseModule.forFeatureAsync([
      { name: Book.name, useFactory: () => BookSchema },
    ]),
  ],
})
export class BooksModule {}
