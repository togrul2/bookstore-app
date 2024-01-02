import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type Gender = 'M' | 'F';

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ type: String })
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
