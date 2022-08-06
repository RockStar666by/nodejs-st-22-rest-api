import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from '../dto/create-group-dto';
import { UpdateGroupDto } from '../dto/update-group-dto';
import { Group } from '../group.entity';
import { GroupsRepository } from './groups.repository';
import { sortByLogin } from 'src/utils/sort-by-login';
@Injectable()
class InMemoryGroupsRepository implements GroupsRepository {
  private users: Array<Group> = [
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

  async findById(id: string): Promise<Group> {
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
  ): Promise<Group[]> {
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

  async delete(id: string): Promise<Group> {
    const userIndex = await this.findIndex(id);
    this.users[userIndex] = {
      ...this.users[userIndex],
      isDeleted: true,
    };
    const updUser = await this.findById(id);
    return updUser;
  }

  async create(dto: CreateGroupDto): Promise<Group> {
    let checkUnique = this.users.find((user) => user.login === dto.login);
    if (checkUnique) return;
    const user = { id: uuidv4(), ...dto, isDeleted: false };
    this.users.push(user);
    return user;
  }

  async update(id: string, dto: UpdateGroupDto): Promise<Group> {
    const userIndex = await this.findIndex(id);
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...dto,
    };
    const updUser = await this.findById(id);
    return updUser;
  }
}

export { InMemoryGroupsRepository };
