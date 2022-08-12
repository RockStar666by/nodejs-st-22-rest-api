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
import { GroupParamsDto } from './dto/group-params-dto';
import { AddUsersToGroupDto } from './dto/add-users-to-group-dto';
import { MethodInfoLogger } from 'src/loggers/method-info-logger.decorator';

@Controller({
  version: '1',
})
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get('groups')
  @MethodInfoLogger
  async getAllGroups() {
    const filteredUsers = await this.groupsService.getAllGroups();
    return filteredUsers;
  }

  @Get('groups/:id')
  @MethodInfoLogger
  async getGroup(@Param() params: GroupParamsDto): Promise<Group> {
    const group = await this.groupsService.getGroup(params.id);
    if (!group) {
      throw new HttpException('Group not found', HttpStatus.BAD_REQUEST);
    }
    return group;
  }

  @Post('groups')
  @MethodInfoLogger
  async createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    const group = await this.groupsService.createGroup(createGroupDto);
    if (!group) {
      throw new HttpException(
        'This login already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    return group;
  }

  @Put('groups/:id')
  @MethodInfoLogger
  async updateGroup(
    @Param() params: GroupParamsDto,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    const group = await this.groupsService.updateGroup(
      params.id,
      updateGroupDto,
    );
    if (!group) {
      throw new HttpException('Group not found', HttpStatus.BAD_REQUEST);
    }
    return group;
  }

  @Post('groups/:id')
  @MethodInfoLogger
  async addUsersToGroup(
    @Param() params: GroupParamsDto,
    @Body() addUsersToGroupDto: AddUsersToGroupDto,
  ) {
    const updatedGroup = await this.groupsService.addUsersToGroup(
      params.id,
      addUsersToGroupDto,
    );
    return updatedGroup;
  }

  @Delete('groups/:id')
  @MethodInfoLogger
  async deleteGroup(@Param() params: GroupParamsDto) {
    const group = await this.groupsService.deleteGroup(params.id);
    if (!group) {
      throw new HttpException('Group not found', HttpStatus.BAD_REQUEST);
    }
  }
}
