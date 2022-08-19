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
      id: uuidv4(),
      login: 'johndoe111',
      password: '12345678abc',
      age: 20,
      isDeleted: false,
    },
    {
      id: uuidv4(),
      login: 'johndoe222',
      password: '12345678abc',
      age: 21,
      isDeleted: false,
    },
    {
      id: uuidv4(),
      login: 'johndoe333',
      password: '12345678abc',
      age: 22,
      isDeleted: false,
    },
    {
      id: uuidv4(),
      login: 'johndoe444',
      password: '12345678abc',
      age: 23,
      isDeleted: false,
    },
    {
      id: uuidv4(),
      login: 'johndoe555',
      password: '12345678abc',
      age: 24,
      isDeleted: false,
    },
    {
      id: uuidv4(),
      login: 'johndoe666',
      password: '12345678abc',
      age: 25,
      isDeleted: false,
    },
  ];

  findByLogin(login: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

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
