import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { UsersRepository } from './users.repository';
import { User as UserModel } from '../user.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateUserDto } from '../dto/create-user-dto';
import { UpdateUserDto } from '../dto/update-user-dto';

@Injectable()
class SequelizeUsersRepository implements UsersRepository {
  constructor(@InjectModel(UserModel) private users: typeof UserModel) {}

  async findById(id: string): Promise<User> {
    const user = await this.users.findByPk(id);
    return user;
  }

  async findAll(loginSubstring?: string, limit?: number): Promise<User[]> {
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

  async delete(id: string): Promise<User> {
    await this.users.update(
      { isDeleted: true },
      {
        where: { id: id },
      },
    );
    const user = await this.users.findByPk(id);
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.users.create(dto);
    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.users.update(dto, {
      where: { id: id },
    });
    const user = await this.users.findByPk(id);
    return user;
  }
}

export { SequelizeUsersRepository };
