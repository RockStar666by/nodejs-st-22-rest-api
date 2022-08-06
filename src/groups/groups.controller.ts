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
import { Group } from './group.entity';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group-dto';
import { UpdateGroupDto } from './dto/update-group-dto';

@Controller({
  version: '1',
})
export class GroupsController {
  constructor(private readonly groupService: GroupsService) {}

  @Get('users')
  async getAllGroups() {
    const filteredUsers = await this.groupService.getAllUsers();
    return filteredUsers;
  }

  @Get('users/:id')
  async getUser(@Param() params: any): Promise<Group> {
    const user = await this.groupService.getUser(params.id);
    console.log(user);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @Post('users')
  async createUser(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    const user = await this.groupService.createUser(createGroupDto);
    if (!user) {
      throw new HttpException(
        'This login already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  @Put('users/:id')
  async updateUser(
    @Param() params: any,
    @Body() updateUserDto: any,
  ): Promise<Group> {
    const user = await this.groupService.updateUser(params.id, updateUserDto);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @Delete('users/:id')
  async softDeleteUser(@Param() params: any) {
    const user = await this.groupService.softDeleteUser(params.id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
  }
}
