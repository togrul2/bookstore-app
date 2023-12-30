import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthorsModule } from './authors/authors.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    BooksModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthorsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
