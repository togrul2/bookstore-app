import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './schemas/author.schema';
import { AuthorsRepository } from './authors.repository';

@Module({
  controllers: [AuthorsController],
  imports: [
    MongooseModule.forFeatureAsync([
      { name: Author.name, useFactory: () => AuthorSchema },
    ]),
  ],
  providers: [AuthorsService, AuthorsRepository],
  exports: [AuthorsRepository],
})
export class AuthorsModule {}
