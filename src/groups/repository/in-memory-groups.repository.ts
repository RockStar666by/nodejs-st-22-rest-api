import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from '../dto/create-group-dto';
import { UpdateGroupDto } from '../dto/update-group-dto';
import { Group } from '../group.entity';
import { GroupsRepository } from './groups.repository';
import { AddUsersToGroupDto } from '../dto/add-users-to-group-dto';
@Injectable()
class InMemoryGroupsRepository implements GroupsRepository {
  private groups: Array<Group> = [];

  async findById(id: string): Promise<Group> {
    return this.groups.find((group) => group.id === id);
  }

  private async findIndex(id: string): Promise<number> {
    return this.groups.findIndex((group) => group.id === id);
  }

  async findAll(): Promise<Group[]> {
    return this.groups;
  }

  async delete(id: string): Promise<Group> {
    const group = this.findById(id);
    const index = await this.findIndex(id);
    if (index > -1) {
      this.groups.splice(index, 1);
    }
    return group;
  }

  async create(dto: CreateGroupDto): Promise<Group> {
    let checkUnique = this.groups.find((group) => group.name === dto.name);
    if (checkUnique) return;
    const group = { id: uuidv4(), ...dto };
    this.groups.push(group);
    return group;
  }

  async update(id: string, dto: UpdateGroupDto): Promise<Group> {
    const index = await this.findIndex(id);
    this.groups[index] = {
      ...this.groups[index],
      ...dto,
    };
    const updGroup = await this.findById(id);
    return updGroup;
  }

  async addUsersToGroup(id: string, dto: AddUsersToGroupDto): Promise<Group> {
    throw new Error('Method not implemented.');
  }
}

export { InMemoryGroupsRepository };
