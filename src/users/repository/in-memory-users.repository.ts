import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user-dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { User } from '../user.entity';
import { UsersRepository } from './users.repository';
import { sortByLogin } from 'src/utils/sort-by-login';
@Injectable()
class InMemoryUsersRepository implements UsersRepository {
  private users: Array<User> = [
    {
      id: 'sdafsf',
      login: 'dsgsdfg',
      password: 'sfgsdfg',
      age: 5,
      isDeleted: false,
    },
  ];

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  private async findIndex(id: string): Promise<number> {
    const user = this.users.findIndex((user) => user.id === id);
    return user;
  }

  async findAll(
    loginSubstring?: string,
    limit: string = this.users.length.toString(),
  ): Promise<User[]> {
    if (loginSubstring) {
      const filteredUsers = this.users.reduce((result, user) => {
        if (
          user.login.toLowerCase().indexOf(loginSubstring.toLowerCase()) !==
            -1 &&
          user.isDeleted === false
        ) {
          result.push(user);
        }
        return result;
      }, []);
      return filteredUsers.sort(sortByLogin).slice(0, Number(limit));
    } else
      return this.users
        .filter((user) => user.isDeleted === false)
        .slice(0, Number(limit));
  }

  async delete(id: string): Promise<User> {
    const userIndex = await this.findIndex(id);
    this.users[userIndex] = {
      ...this.users[userIndex],
      isDeleted: true,
    };
    const updUser = await this.findById(id);
    return updUser;
  }

  async create(dto: CreateUserDto): Promise<User> {
    let checkUnique = this.users.find((user) => user.login === dto.login);
    if (checkUnique) return;
    const user = { id: uuidv4(), ...dto, isDeleted: false };
    this.users.push(user);
    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const userIndex = await this.findIndex(id);
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...dto,
    };
    const updUser = await this.findById(id);
    return updUser;
  }
}

export { InMemoryUsersRepository };
