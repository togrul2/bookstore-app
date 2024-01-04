import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

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
}

export const UserSchema = SchemaFactory.createForClass(User);
