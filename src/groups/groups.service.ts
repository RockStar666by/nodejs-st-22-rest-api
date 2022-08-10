import { Injectable } from '@nestjs/common';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/create-group-dto';
import { UpdateGroupDto } from './dto/update-group-dto';
import { GroupsRepository } from './repository/groups.repository';
import { AddUsersToGroupDto } from './dto/add-users-to-group-dto';

@Injectable()
export class GroupsService {
  constructor(private groupsRepository: GroupsRepository) {}

  async getAllGroups(
    loginSubstring?: string,
    limit?: string,
  ): Promise<Group[]> {
    const groups = this.groupsRepository.findAll(loginSubstring, limit);
    return groups;
  }

  async getGroup(id: string): Promise<Group> {
    const group = this.groupsRepository.findById(id);
    return group;
  }

  async createGroup(dto: CreateGroupDto): Promise<Group> {
    const createdGroup = this.groupsRepository.create(dto);
    return createdGroup;
  }

  async updateGroup(id: string, dto: UpdateGroupDto): Promise<Group> {
    const updGroup = this.groupsRepository.update(id, dto);
    return updGroup;
  }

  async deleteGroup(id: string) {
    const delGroup = this.groupsRepository.delete(id);
    return delGroup;
  }

  async addUsersToGroup(id: string, dto: AddUsersToGroupDto) {
    const updGroup = this.groupsRepository.addUsersToGroup(id, dto);
    return updGroup;
  }
}
