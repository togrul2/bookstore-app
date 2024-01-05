import { Types } from 'mongoose';
import { Book } from '../schemas/book.schema';
import { AuthorEntity } from '../../authors/entities/author.entity';

export class BookEntity {
  readonly id: string;
  readonly title: string;
  readonly author?: string | AuthorEntity;
  readonly category: string;
  readonly tags: string[];
  readonly publicationYear: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  public static fromInstance(instance: Book): BookEntity {
    let author = undefined;

    if (instance.author instanceof Types.ObjectId) {
      author = instance.author.toHexString();
    } else if (instance.author) {
      author = AuthorEntity.fromInstance(instance.author);
    }

    return new BookEntity(
      instance._id.toHexString(),
      instance.title,
      author,
      instance.category,
      instance.tags,
      instance.publicationYear,
      instance.createdAt,
      instance.updatedAt,
    );
  }

  private constructor(
    id: string,
    title: string,
    author: AuthorEntity | string | undefined,
    category: string,
    tags: string[],
    publicationYear: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.category = category;
    this.tags = tags;
    this.publicationYear = publicationYear;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
