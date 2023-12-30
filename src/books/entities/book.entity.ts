import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop()
  author: string;

  @Prop()
  publicationYear: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
