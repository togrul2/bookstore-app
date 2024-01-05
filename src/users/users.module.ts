import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController, UsersMeController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcrypt';
import { UsersRepository } from './users.repository';
import { User, UserSchema } from './schema/user.schema';

@Module({
  controllers: [UsersMeController, UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          UserSchema.pre<User>('save', function (next: any) {
            genSalt(10).then((salt) => {
              hash(this.password, salt, (err, hash) => {
                if (err) return next(err);
                this.password = hash;
                next();
              });
            });
          });
          return UserSchema;
        },
      },
    ]),
  ],
})
export class UsersModule {}
