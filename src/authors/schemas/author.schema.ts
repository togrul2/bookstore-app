import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, validateBeforeSave: true })
export class Author extends Document {
  @Prop()
  fullName!: string;

  @Prop()
  dateOfBirth!: Date;

  @Prop()
  dateOfDeath?: Date;

  @Prop()
  nationality!: string;

  @Prop()
  biography!: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(
    fullName: string,
    dateOfBirth: Date,
    dateOfDeath: Date | undefined,
    nationality: string,
    biography: string,
  ) {
    super();
    this.fullName = fullName;
    this.dateOfBirth = dateOfBirth;
    this.dateOfDeath = dateOfDeath;
    this.nationality = nationality;
    this.biography = biography;
  }
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
AuthorSchema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'author',
});
