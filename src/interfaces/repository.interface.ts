import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UpdateUserDto } from 'src/users/dto/update-user-dto';
import { User } from 'src/users/user.entity';

export interface Repository {
  findById(id: string): Promise<User>;
  findAll(loginSubstring?, limit?): Promise<User[]>;
  delete(id: string): Promise<User>;
  create(dto: CreateUserDto): Promise<User>;
  update(id: string, dto: UpdateUserDto): Promise<User>;
}
