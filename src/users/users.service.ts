import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersRepository } from './repository/users.repository';
// import { InjectModel } from '@nestjs/sequelize';
// import { User as MUser } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository') private usersRepository: UsersRepository,
  ) {
    this.usersRepository = usersRepository;
  }

  async getAllUsers(loginSubstring?: string, limit?: string): Promise<User[]> {
    console.log('ALL USERS');
    const users = this.usersRepository.findAll(loginSubstring, limit);
    return users;
  }

  async getUser(id: string): Promise<User> {
    const user = this.usersRepository.findById(id);
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = this.usersRepository.create(createUserDto);
    return createdUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updUser = this.usersRepository.update(id, updateUserDto);
    return updUser;
  }

  async softDeleteUser(id: string) {
    const delUser = this.usersRepository.delete(id);
    return delUser;
  }
}
