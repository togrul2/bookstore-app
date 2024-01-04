import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ValidationError,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './users.schema';
import { compare } from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  public constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * Validates user data.
   * @param dto User data transfer object.
   * @param userId User id to exclude from validation.
   * @private
   */
  private async validateUserData(
    dto: Partial<CreateUserDto>,
    userId: string | null = null,
  ): Promise<void> {
    const errors: ValidationError[] = [];

    if (
      dto.email &&
      (await this.usersRepository.existsByEmail(dto.email, userId))
    ) {
      errors.push({
        property: 'email',
        constraints: { Unique: 'This email is already taken.' },
      });
    }

    if (errors.length > 0) throw new BadRequestException(errors);
  }

  /**
   * Creates a new user.
   * @param createUserDto User data transfer object.
   * @throws BadRequestException If user data is invalid.
   */
  public async create(createUserDto: CreateUserDto): Promise<User> {
    await this.validateUserData(createUserDto);
    return this.usersRepository.createUser(createUserDto);
  }

  public async findAll(): Promise<User[]> {
    return this.usersRepository.getUsers();
  }

  public async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.getUserById(id);
    if (user === null) throw new BadRequestException();
    return user;
  }

  public async update(
    id: string,
    updateUserDto: Partial<UpdateUserDto>,
  ): Promise<User> {
    await this.validateUserData(updateUserDto, id);
    const user = await this.usersRepository.updateUser(id, updateUserDto);
    if (user === null) throw new NotFoundException();
    return user;
  }

  public async remove(id: string): Promise<void> {
    if ((await this.usersRepository.deleteUser(id)) === null)
      throw new NotFoundException();
  }

  public async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    const user = await this.usersRepository.getUserById(id);
    if (user === null) throw new NotFoundException();

    if (!(await compare(updatePasswordDto.currentPassword, user.password)))
      throw new ForbiddenException('Invalid current password.');

    await this.usersRepository.updateUser(id, {
      password: updatePasswordDto.newPassword,
    });
  }
}
