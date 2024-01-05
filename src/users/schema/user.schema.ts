import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../auth/role.enum';
import { Gender } from '../users.type';

@Schema({ timestamps: true, validateBeforeSave: true })
export class User extends Document {
  @Prop({ required: true, unique: true, index: true })
  email!: string;

  @Prop()
  fullName!: string;

  @Prop()
  gender?: Gender;

  @Prop()
  birthDate!: Date;

  @Prop()
  password!: string;

  @Prop()
  isBanned: boolean = false;

  @Prop()
  roles: Role[] = [Role.USER];

  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
