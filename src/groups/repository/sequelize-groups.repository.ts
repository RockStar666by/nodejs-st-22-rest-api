import { Injectable } from '@nestjs/common';
import { Group } from '../group.entity';
import { GroupsRepository } from './groups.repository';
import { Group as GroupModel } from '../group.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateGroupDto } from '../dto/create-group-dto';
import { UpdateGroupDto } from '../dto/update-group-dto';
import { AddUsersToGroupDto } from '../dto/add-users-to-group-dto';
import { User } from '../../users/user.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
class SequelizeGroupsRepository implements GroupsRepository {
  constructor(
    @InjectModel(GroupModel) private groups: typeof GroupModel,
    private sequelize: Sequelize,
  ) {}

  async findById(id: string): Promise<Group> {
    return await this.groups.findByPk(id);
  }

  async findAll(): Promise<Group[]> {
    return await this.groups.findAll({
      include: User,
    });
  }

  async delete(id: string): Promise<Group> {
    const group = await this.groups.findByPk(id);
    await this.groups.destroy({
      where: { id: id },
    });

    return group;
  }

  async create(dto: CreateGroupDto): Promise<Group> {
    return await this.groups.create(dto);
  }

  async update(id: string, dto: UpdateGroupDto): Promise<Group> {
    await this.groups.update(dto, {
      where: { id: id },
    });
    return await this.groups.findByPk(id);
  }

  async addUsersToGroup(
    id: string,
    dto: AddUsersToGroupDto,
  ): Promise<void | Group> {
    try {
      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };
        const group = await this.groups.findByPk(id, transactionHost);
        await group.$add('users', dto.userIds, transactionHost);
        return group;
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}

export { SequelizeGroupsRepository };
