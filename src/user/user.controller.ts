import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ObjectIdValidationPipe } from '../app.pipe';
import { CreateUserDto, PartialUpdateUserDto, UserEntity } from './user.dto';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequestErrorDto, ErrorDto } from '../app.dto';
import { User } from './user.schema';

@Controller('users')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: [UserEntity], description: 'List of fetched users' })
  @ApiUnauthorizedResponse({ type: ErrorDto, description: 'Not authenticated' })
  public async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity, description: 'Fetched user' })
  @ApiUnauthorizedResponse({ type: ErrorDto, description: 'Not authenticated' })
  @ApiNotFoundResponse({ type: ErrorDto, description: 'User not found' })
  public async getUserById(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Post()
  @ApiCreatedResponse({ type: UserEntity, description: 'Created user' })
  @ApiBadRequestResponse({
    type: BadRequestErrorDto,
    description: 'Validation error',
  })
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @ApiOkResponse({ type: UserEntity, description: 'Updated user' })
  @ApiBadRequestResponse({
    type: BadRequestErrorDto,
    description: 'Validation error',
  })
  @ApiUnauthorizedResponse({ type: ErrorDto, description: 'Not authenticated' })
  @ApiForbiddenResponse({
    type: ErrorDto,
    description:
      'Forbidden, action is available only for admins if target user is not the authenticated one.',
  })
  @ApiNotFoundResponse({ type: ErrorDto, description: 'User not found' })
  public async updateUser(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity, description: 'Updated user' })
  @ApiBadRequestResponse({
    type: BadRequestErrorDto,
    description: 'Validation error',
  })
  @ApiUnauthorizedResponse({ type: ErrorDto, description: 'Not authenticated' })
  @ApiForbiddenResponse({
    type: ErrorDto,
    description:
      'Forbidden, action is available only for admins if target user is not the authenticated one.',
  })
  @ApiNotFoundResponse({ type: ErrorDto, description: 'User not found' })
  public async patchUser(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateUserDto: PartialUpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Deleted user' })
  @ApiUnauthorizedResponse({ type: ErrorDto, description: 'Not authenticated' })
  @ApiForbiddenResponse({
    type: ErrorDto,
    description:
      'Forbidden, action is available only for admins if target user is not the authenticated one.',
  })
  @ApiNotFoundResponse({ type: ErrorDto, description: 'User not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteUser(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<void> {
    await this.userService.deleteUser(id);
  }

  // @Get('me')
  // @UseGuards(LocalAuthGuard)
  // public async getMyProfile(@Request() req: Req): Promise<UserEntity> {
  //   if (!req.user) {
  //     throw new Error('User not found');
  //   }
  //
  //   return this.userService.getUserById(req.user._id);
  // }

  // @Put('me')
  // public updateMyProfile(@Body() updateUserDto: CreateUserDto) {}
  //
  // @Patch('me')
  // public patchMyProfile(@Body() updateUserDto: UpdateUserDto) {}
  //
  // @Delete('me')
  // public deleteMyProfile() {}
}
