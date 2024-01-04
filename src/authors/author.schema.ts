import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, validateBeforeSave: true })
export class Author {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ default: null, type: Date })
  dateOfDeath: Date | null;

  @Prop({ required: true })
  nationality: string;

  @Prop({ required: true })
  biography: string;

  constructor(
    fullName: string,
    dateOfBirth: Date,
    dateOfDeath: Date | null,
    nationality: string,
    biography: string,
  ) {
    this.fullName = fullName;
    this.dateOfBirth = dateOfBirth;
    this.dateOfDeath = dateOfDeath;
    this.nationality = nationality;
    this.biography = biography;
  }
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
