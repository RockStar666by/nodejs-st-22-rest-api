import { Injectable } from '@nestjs/common';
import { Group } from '../group.entity';
import { GroupsRepository } from './groups.repository';
import { Group as GroupModel } from '../group.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateGroupDto } from '../dto/create-group-dto';
import { UpdateGroupDto } from '../dto/update-group-dto';

@Injectable()
class SequelizeGroupsRepository implements GroupsRepository {
  constructor(@InjectModel(GroupModel) private groups: typeof GroupModel) {}

  async findById(id: string): Promise<Group> {
    const group = await this.groups.findByPk(id);
    return group;
  }

  async findAll(): Promise<Group[]> {
    const users = await this.groups.findAll({
      include: { all: true },
    });
    return users;
  }

  async delete(id: string): Promise<Group> {
    await this.groups.destroy({
      where: { id: id },
    });
    const user = await this.groups.findByPk(id);
    return user;
  }

  async create(dto: CreateGroupDto): Promise<Group> {
    const user = await this.groups.create(dto);
    return user;
  }

  async update(id: string, dto: UpdateGroupDto): Promise<Group> {
    await this.groups.update(dto, {
      where: { id: id },
    });
    const user = await this.groups.findByPk(id);
    return user;
  }
}

export { SequelizeGroupsRepository };
