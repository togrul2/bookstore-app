import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ValidationError,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from './user.dto';
import { User } from './user.schema';
import { compare } from 'bcrypt';
import { UserRepository } from './user.repository';

class UserNotFoundException extends NotFoundException {
  public constructor(id: string) {
    super(`User with id '${id}' not found`);
  }
}

@Injectable()
export class UserService {
  public constructor(private readonly userRepository: UserRepository) {}

  /**
   * Returns all users.
   */
  public async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

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
      dto.username &&
      (await this.userRepository.existsByUsername(dto.username, userId))
    ) {
      errors.push({
        property: 'username',
        children: [],
        target: dto,
        constraints: { unique: 'This username is already taken.' },
        value: dto.username,
        contexts: {},
      });
    }

    if (
      dto.email &&
      (await this.userRepository.existsByEmail(dto.email, userId))
    ) {
      errors.push({
        property: 'email',
        children: [],
        target: dto,
        constraints: { unique: 'This email is already taken.' },
        contexts: {},
        value: dto.email,
      });
    }

    if (errors.length > 0) throw new BadRequestException(errors);
  }

  /**
   * Creates a new user.
   * @param createUserDto User data transfer object.
   * @throws BadRequestException If user data is invalid.
   */
  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    await this.validateUserData(createUserDto);
    return this.userRepository.createUser(createUserDto);
  }

  /**
   * Returns user with given id.
   * @param id User id.
   */
  public async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.getUserById(id);

    if (user === null) throw new UserNotFoundException(id);

    return user;
  }

  public async updateUser(
    id: string,
    updateUserDto: Partial<UpdateUserDto>,
  ): Promise<User> {
    await this.validateUserData(updateUserDto, id);
    const user = await this.userRepository.updateUser(id, updateUserDto);

    if (user === null) throw new UserNotFoundException(id);

    return user;
  }

  public async deleteUser(id: string): Promise<void> {
    if ((await this.userRepository.deleteUser(id)) === null)
      throw new UserNotFoundException(id);
  }

  public async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    const user = await this.userRepository.getUserById(id);
    if (user === null) throw new UserNotFoundException(id);

    if (!(await compare(updatePasswordDto.currentPassword, user.password)))
      throw new ForbiddenException('Invalid current password.');

    await this.userRepository.updateUser(id, {
      password: updatePasswordDto.newPassword,
    });
  }
}
