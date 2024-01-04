import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { AuthorEntity } from './entities/author.entity';
import { Author } from './author.schema';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import {
  CreateAuthorDto,
  createAuthorDtoFactory,
} from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

const moduleMocker = new ModuleMocker(global);

describe('AuthorsController', () => {
  let controller: AuthorsController;
  const authors: any[] = [
    new Author(
      'John Doe',
      new Date('1960-01-01'),
      new Date('2020-01-01'),
      'American',
      'John Doe is a famous American author.',
    ),
    new Author(
      'Jane Doe',
      new Date('1960-01-01'),
      new Date('2020-01-01'),
      'American',
      'Jane Doe is a famous American author.',
    ),
    new Author(
      'John Smith',
      new Date('1960-01-01'),
      new Date('2020-01-01'),
      'American',
      'John Smith is a famous American author.',
    ),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
    })
      .useMocker((token) => {
        if (token === AuthorsService) {
          return {
            findAll: jest.fn().mockResolvedValue(authors),
            findOne: jest
              .fn()
              .mockImplementation((id: string) => authors[Number(id)]),
            create: jest
              .fn()
              .mockImplementation(
                (dto: CreateAuthorDto) =>
                  new Author(
                    dto.fullName,
                    dto.dateOfBirth,
                    dto.dateOfDeath,
                    dto.nationality,
                    dto.biography,
                  ),
              ),
            update: jest
              .fn()
              .mockImplementation(
                (id: number, dto: UpdateAuthorDto) =>
                  new Author(
                    dto.fullName || authors[id].fullName,
                    dto.dateOfBirth || authors[id].dateOfBirth,
                    dto.dateOfDeath || authors[id].dateOfDeath,
                    dto.nationality || authors[id].nationality,
                    dto.biography || authors[id].biography,
                  ),
              ),
            remove: jest.fn().mockImplementation(() => {}),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<AuthorsController>(AuthorsController);
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      expect(await controller.findAll()).toStrictEqual(
        authors.map(AuthorEntity.from),
      );
    });
  });

  describe('findOne', () => {
    it('should return an author', async () => {
      expect(await controller.findOne('1')).toStrictEqual(
        AuthorEntity.from(authors[1]),
      );
    });
  });

  describe('create', () => {
    it('should create an author', async () => {
      const dto = createAuthorDtoFactory(
        'John Doe',
        new Date('1960-01-01'),
        new Date('2020-01-01'),
        'American',
        'John Doe is a famous American author.',
      );
      expect(await controller.create(dto)).toStrictEqual(
        AuthorEntity.from(
          new Author(
            'John Doe',
            new Date('1960-01-01'),
            new Date('2020-01-01'),
            'American',
            'John Doe is a famous American author.',
          ),
        ),
      );
    });
  });

  describe('replace', () => {
    it('should replace an author', async () => {
      const dto = createAuthorDtoFactory(
        'John Doe',
        new Date('1960-01-01'),
        new Date('2020-01-01'),
        'American',
        'John Doe is a famous American author.',
      );
      expect(await controller.replace('1', dto)).toStrictEqual(
        AuthorEntity.from(
          new Author(
            'John Doe',
            new Date('1960-01-01'),
            new Date('2020-01-01'),
            'American',
            'John Doe is a famous American author.',
          ),
        ),
      );
    });
  });

  describe('update', () => {
    it('should update an author', async () => {
      const dto = new UpdateAuthorDto();
      dto.fullName = 'Jack Doe';
      dto.biography = 'Jack Doe is a famous American author.';
      expect(await controller.update('1', dto)).toStrictEqual(
        AuthorEntity.from(
          new Author(
            'Jack Doe',
            new Date('1960-01-01'),
            new Date('2020-01-01'),
            'American',
            'Jack Doe is a famous American author.',
          ),
        ),
      );
    });
  });

  describe('remove', () => {
    it('should remove an author', async () => {
      expect(await controller.remove('1')).toBeUndefined();
    });
  });
});
