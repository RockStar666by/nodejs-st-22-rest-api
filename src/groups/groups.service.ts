import { Injectable } from '@nestjs/common';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/create-group-dto';
import { UpdateGroupDto } from './dto/update-group-dto';
import { GroupsRepository } from './repository/groups.repository';

@Injectable()
export class GroupsService {
  constructor(private usersRepository: GroupsRepository) {
    this.usersRepository = usersRepository;
  }

  async getAllUsers(loginSubstring?: string, limit?: string): Promise<Group[]> {
    console.log('ALL USERS');
    const users = this.usersRepository.findAll(loginSubstring, limit);
    return users;
  }

  async getUser(id: string): Promise<Group> {
    const user = this.usersRepository.findById(id);
    return user;
  }

  async createUser(createUserDto: CreateGroupDto): Promise<Group> {
    const createdUser = this.usersRepository.create(createUserDto);
    return createdUser;
  }

  async updateUser(id: string, updateUserDto: UpdateGroupDto): Promise<Group> {
    const updUser = this.usersRepository.update(id, updateUserDto);
    return updUser;
  }

  async softDeleteUser(id: string) {
    const delUser = this.usersRepository.delete(id);
    return delUser;
  }
}
