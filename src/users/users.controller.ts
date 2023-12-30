import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './users.serializers';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  // ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  // ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequestErrorDto, ErrorDto } from '../app.dto';
import { LocationHeaderInterceptor } from '../app.interceptor';
import { ObjectIdValidationPipe } from '../app.pipe';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity, description: 'Created user' })
  @ApiBadRequestResponse({
    type: BadRequestErrorDto,
    description: 'Validation error',
  })
  @UseInterceptors(new LocationHeaderInterceptor('api/v1/users'))
  public async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return UserEntity.from(await this.usersService.create(createUserDto));
  }

  @Get()
  @ApiOkResponse({ type: [UserEntity], description: 'List of fetched users' })
  // @ApiUnauthorizedResponse({ type: ErrorDto, description: 'Not authenticated' })
  public async findAll() {
    return (await this.usersService.findAll()).map(UserEntity.from);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity, description: 'Fetched user' })
  @ApiNotFoundResponse({ type: ErrorDto, description: 'User not found' })
  public async findOne(@Param('id', ObjectIdValidationPipe) id: string) {
    return UserEntity.from(await this.usersService.findOne(id));
  }

  @Put(':id')
  @ApiOkResponse({ type: UserEntity, description: 'Updated user' })
  @ApiBadRequestResponse({
    type: BadRequestErrorDto,
    description: 'Validation error',
  })
  // @ApiUnauthorizedResponse({ type: ErrorDto, description: 'Not authenticated' })
  // @ApiForbiddenResponse({
  //   type: ErrorDto,
  //   description:
  //     'Forbidden, action is available only for admins if target user is not the authenticated one.',
  // })
  @ApiNotFoundResponse({ type: ErrorDto, description: 'User not found' })
  public async replace(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return UserEntity.from(await this.usersService.update(id, updateUserDto));
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity, description: 'Updated user' })
  @ApiBadRequestResponse({
    type: BadRequestErrorDto,
    description: 'Validation error',
  })
  // @ApiUnauthorizedResponse({ type: ErrorDto, description: 'Not authenticated' })
  // @ApiForbiddenResponse({
  //   type: ErrorDto,
  //   description:
  //     'Forbidden, action is available only for admins if target user is not the authenticated one.',
  // })
  @ApiNotFoundResponse({ type: ErrorDto, description: 'User not found' })
  public async update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return UserEntity.from(await this.usersService.update(id, updateUserDto));
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Deleted user' })
  // @ApiUnauthorizedResponse({ type: ErrorDto, description: 'Not authenticated' })
  // @ApiForbiddenResponse({
  //   type: ErrorDto,
  //   description:
  //     'Forbidden, action is available only for admins if target user is not the authenticated one.',
  // })
  @ApiNotFoundResponse({ type: ErrorDto, description: 'User not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<void> {
    await this.usersService.remove(id);
  }

  @Post(':id/update-password')
  @ApiOkResponse({ description: 'Updated password' })
  @ApiBadRequestResponse({
    type: BadRequestErrorDto,
    description: 'Validation error',
  })
  @ApiNotFoundResponse({ type: ErrorDto, description: 'User not found' })
  // @ApiUnauthorizedResponse({ type: ErrorDto, description: 'Not authenticated' })
  // @ApiForbiddenResponse({
  //   type: ErrorDto,
  //   description:
  //     'Forbidden, action is available only for admins if target user is not the authenticated one.',
  // })
  public async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    await this.usersService.updatePassword(id, updatePasswordDto);
  }
}
