import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { genSalt, hash } from 'bcrypt';
import { UserRepository } from './user.repository';

@Module({
  providers: [UserService, UserRepository],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          UserSchema.pre<User>('save', function (next) {
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
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
