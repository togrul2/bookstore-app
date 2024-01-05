import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Document } from 'mongoose';
import { Author } from '../../authors/schemas/author.schema';

@Schema({ timestamps: true, validateBeforeSave: true })
export class Book extends Document {
  @Prop()
  title!: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Author', required: false })
  author?: Types.ObjectId | Author;

  @Prop()
  category!: string;

  @Prop([String])
  tags!: string[];

  @Prop()
  publicationYear!: number;

  createdAt: Date;

  updatedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
