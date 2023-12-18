import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  username: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ type: String, enum: Gender, default: null })
  gender: Gender | null;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isBanned: boolean;

  // @Prop({ typedefault: Role.USER })
  // role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
