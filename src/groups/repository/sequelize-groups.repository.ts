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
  constructor(@InjectModel(GroupModel) private users: typeof GroupModel) {}

  async findById(id: string): Promise<Group> {
    const user = await this.users.findByPk(id);
    return user;
  }

  async findAll(loginSubstring?: string, limit?: number): Promise<Group[]> {
    console.log('ALL USERS');
    const users = await this.users.findAll({
      where: {
        ...(loginSubstring && {
          login: {
            [Op.substring]: loginSubstring,
          },
        }),
        isDeleted: false,
      },
      limit: limit,
      order: [['login', 'ASC']],
    });
    return users;
  }

  async delete(id: string): Promise<Group> {
    await this.users.update(
      { isDeleted: true },
      {
        where: { id: id },
      },
    );
    const user = await this.users.findByPk(id);
    return user;
  }

  async create(dto: CreateGroupDto): Promise<Group> {
    const user = await this.users.create(dto);
    return user;
  }

  async update(id: string, dto: UpdateGroupDto): Promise<Group> {
    await this.users.update(dto, {
      where: { id: id },
    });
    const user = await this.users.findByPk(id);
    return user;
  }
}

export { SequelizeGroupsRepository };
