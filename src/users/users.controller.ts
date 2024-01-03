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
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorEntity } from '../app.serializers';
import { LocationHeaderInterceptor } from '../app.interceptor';
import { ObjectIdValidationPipe } from '../app.pipe';
import { Public } from '../auth/auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  @ApiCreatedResponse({ type: UserEntity, description: 'Created user' })
  @ApiBadRequestResponse({
    type: ErrorEntity,
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
  @ApiNotFoundResponse({ type: ErrorEntity, description: 'User not found' })
  public async findOne(@Param('id', ObjectIdValidationPipe) id: string) {
    return UserEntity.from(await this.usersService.findOne(id));
  }

  @Put(':id')
  @ApiOkResponse({ type: UserEntity, description: 'Updated user' })
  @ApiBadRequestResponse({
    type: ErrorEntity,
    description: 'Validation error',
  })
  @ApiNotFoundResponse({ type: ErrorEntity, description: 'User not found' })
  public async replace(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return UserEntity.from(await this.usersService.update(id, updateUserDto));
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity, description: 'Updated user' })
  @ApiBadRequestResponse({
    type: ErrorEntity,
    description: 'Validation error',
  })
  @ApiNotFoundResponse({ type: ErrorEntity, description: 'User not found' })
  public async update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return UserEntity.from(await this.usersService.update(id, updateUserDto));
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Deleted user' })
  @ApiNotFoundResponse({ type: ErrorEntity, description: 'User not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<void> {
    await this.usersService.remove(id);
  }
}
