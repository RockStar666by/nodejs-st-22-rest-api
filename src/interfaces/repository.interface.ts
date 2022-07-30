import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UpdateUserDto } from 'src/users/dto/update-user-dto';
import { User } from 'src/users/user.entity';

export interface Repository {
  findById(id: string): User;
  findAll(): Array<User>;
  delete(id: string): User;
  create(dto: CreateUserDto): User;
  update(id: string, dto: UpdateUserDto): User;
}
