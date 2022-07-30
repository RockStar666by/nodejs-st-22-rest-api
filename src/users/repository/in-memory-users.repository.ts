import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
class InMemoryUsersRepository implements UsersRepository {
  private users = [];

  constructor() {}

  findById(id: string): User {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
  findAll(): User[] {
    throw new Error('Method not implemented.');
  }
  delete(): User {
    throw new Error('Method not implemented.');
  }
  create(): User {
    throw new Error('Method not implemented.');
  }
  update(): User {
    throw new Error('Method not implemented.');
  }
}

export { InMemoryUsersRepository };

// getAllUsers(): User[] {
//   return this.usersRepository.findAll();
// }

// async getUser(id: string): Promise<User> {
//   const user = this.usersRepository.findById(id);
//   return user;
// }

// async getUserIndex(id: string): Promise<number> {
//   const userIndex = this.usersRepository.findIndex(
//     (user) => user.id === id && user.isDeleted === false,
//   );
//   return userIndex;
// }

// async createUser(createUserDto: CreateUserDto): Promise<User> {
//   let checkUnique = this.usersRepository.find(
//     (user) => user.login === createUserDto.login,
//   );
//   if (checkUnique) return;
//   const user = { id: uuidv4(), ...createUserDto, isDeleted: false };
//   this.usersRepository.push(user);
//   return user;
// }

// async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
//   const userIndex = await this.getUserIndex(id);
//   this.usersRepository[userIndex] = {
//     ...this.usersRepository[userIndex],
//     ...updateUserDto,
//   };
//   const updUser = await this.getUser(id);
//   return updUser;
// }

// async softDeleteUser(id: string) {
//   const userIndex = await this.getUserIndex(id);
//   this.usersRepository[userIndex] = {
//     ...this.usersRepository[userIndex],
//     isDeleted: true,
//   };
//   const updUser = await this.getUser(id);
//   return updUser;
// }

// async getAutoSuggestUsers(loginSubstring?: string, limit?: string) {
//   if (loginSubstring && limit) {
//     const filteredUsers = this.usersRepository.reduce((result, user) => {
//       if (
//         user.login.toLowerCase().indexOf(loginSubstring.toLowerCase()) !==
//           -1 &&
//         user.isDeleted === false
//       ) {
//         result.push(user);
//       }
//       return result;
//     }, []);
//     return filteredUsers.sort(sortByLogin).slice(0, Number(limit));
//   } else return this.getAllUsers();
// }
