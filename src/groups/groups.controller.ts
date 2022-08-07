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

@Controller({
  version: '1',
})
export class GroupsController {
  constructor(private readonly groupService: GroupsService) {}

  @Get('groups')
  async getAllGroups() {
    const filteredUsers = await this.groupService.getAllGroups();
    return filteredUsers;
  }

  @Get('groups/:id')
  async getGroup(@Param() params: GroupParamsDto): Promise<Group> {
    const group = await this.groupService.getGroup(params.id);
    if (!group) {
      throw new HttpException('Group not found', HttpStatus.BAD_REQUEST);
    }
    return group;
  }

  @Post('groups')
  async createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    const group = await this.groupService.createGroup(createGroupDto);
    if (!group) {
      throw new HttpException(
        'This login already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    return group;
  }

  @Put('groups/:id')
  async updateGroup(
    @Param() params: GroupParamsDto,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    const group = await this.groupService.updateGroup(
      params.id,
      updateGroupDto,
    );
    if (!group) {
      throw new HttpException('Group not found', HttpStatus.BAD_REQUEST);
    }
    return group;
  }

  @Delete('groups/:id')
  async deleteGroup(@Param() params: GroupParamsDto) {
    const group = await this.groupService.deleteGroup(params.id);
    if (!group) {
      throw new HttpException('Group not found', HttpStatus.BAD_REQUEST);
    }
  }
}
