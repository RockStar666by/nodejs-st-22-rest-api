import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user-dto';

const sortByLogin = (a: User, b: User) => {
  if (a.login.toLowerCase() > b.login.toLowerCase()) {
    return 1;
  }
  if (a.login.toLowerCase() < b.login.toLowerCase()) {
    return -1;
  }
  return 0;
};

@Injectable()
export class UsersService {
  users: Array<User> = [];

  getAllUsers(): User[] {
    return this.users.filter((user) => user.isDeleted === false);
  }

  async getUser(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async getUserIndex(id: string): Promise<number> {
    const userIndex = this.users.findIndex(
      (user) => user.id === id && user.isDeleted === false,
    );
    return userIndex;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    let checkUnique = this.users.find(
      (user) => user.login === createUserDto.login,
    );
    if (checkUnique) return;
    const user = { id: uuidv4(), ...createUserDto, isDeleted: false };
    this.users.push(user);
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userIndex = await this.getUserIndex(id);
    this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
    const updUser = await this.getUser(id);
    return updUser;
  }

  async softDeleteUser(id: string) {
    const userIndex = await this.getUserIndex(id);
    this.users[userIndex] = { ...this.users[userIndex], isDeleted: true };
    const updUser = await this.getUser(id);
    return updUser;
  }

  async getAutoSuggestUsers(loginSubstring?: string, limit?: string) {
    if (loginSubstring && limit) {
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
    } else return this.getAllUsers();
  }
}
