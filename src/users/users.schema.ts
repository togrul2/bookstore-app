import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Role } from '../auth/role.enum';

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
}

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ type: String, required: false })
  gender?: Gender;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isBanned: boolean;

  @Prop({ default: [Role.USER] })
  roles: Role[] = [Role.USER];
}

export const UserSchema = SchemaFactory.createForClass(User);
