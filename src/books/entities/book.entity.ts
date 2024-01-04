import { Expose } from 'class-transformer';

export class BookEntity {
  @Expose()
  id: string;
  @Expose()
  title: string;
  @Expose()
  author: string;
  @Expose()
  publicationYear: number;

  static from(item: Partial<BookEntity>): BookEntity {
    return new BookEntity({
      id: item.id,
      title: item.title,
      author: item.author,
      publicationYear: item.publicationYear,
    });
  }

  private constructor(partial: Partial<BookEntity>) {
    Object.assign(this, partial);
  }
}
