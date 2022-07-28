import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  HttpStatus,
  HttpException,
  Param,
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { AutoSuggestUsersDto } from './dto/auto-suggest-users-dto';
import { UserParamsDto } from './dto/user-params-dto';

@Controller({
  version: '1',
})
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('users')
  async getAutoSuggestUsers(@Query() query: AutoSuggestUsersDto) {
    const { loginSubstring, limit } = query;
    const filteredUsers = await this.userService.getAutoSuggestUsers(
      loginSubstring,
      limit,
    );
    return filteredUsers;
  }

  @Get('users/:id')
  getUser(@Param() params: UserParamsDto): Promise<User> {
    const user = this.userService.getUser(params.id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  @Put('users/:id')
  async updateUser(
    @Param() params: UserParamsDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userService.updateUser(params.id, updateUserDto);
    return user;
  }

  @Delete('users/:id')
  async softDeleteUser(@Param() params: UserParamsDto) {
    await this.userService.softDeleteUser(params.id);
  }
}
