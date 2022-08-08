import { Injectable } from '@nestjs/common';
import { Group } from '../group.entity';
import { GroupsRepository } from './groups.repository';
import { Group as GroupModel } from '../group.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateGroupDto } from '../dto/create-group-dto';
import { UpdateGroupDto } from '../dto/update-group-dto';
import { AddUsersToGroupDto } from '../dto/add-users-to-group-dto';
import { User } from 'src/users/user.model';

@Injectable()
class SequelizeGroupsRepository implements GroupsRepository {
  constructor(@InjectModel(GroupModel) private groups: typeof GroupModel) {}

  async findById(id: string): Promise<Group> {
    const group = await this.groups.findByPk(id);
    return group;
  }

  async findAll(): Promise<Group[]> {
    const groups = await this.groups.findAll({
      include: User,
    });
    return groups;
  }

  async delete(id: string): Promise<Group> {
    const group = await this.groups.findByPk(id);
    // group.$set('users', []);
    await this.groups.destroy({
      where: { id: id },
    });

    return group;
  }

  async create(dto: CreateGroupDto): Promise<Group> {
    const group = await this.groups.create(dto);
    return group;
  }

  async update(id: string, dto: UpdateGroupDto): Promise<Group> {
    await this.groups.update(dto, {
      where: { id: id },
    });
    const group = await this.groups.findByPk(id);
    return group;
  }

  async addUsersToGroup(id: string, dto: AddUsersToGroupDto): Promise<Group> {
    const group = await this.groups.findByPk(id);
    group.$add('users', dto.userIds);
    return group;
  }
}

export { SequelizeGroupsRepository };
