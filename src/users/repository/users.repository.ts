import { Repository } from '../../interfaces/repository.interface';
import { CreateUserDto } from '../dto/create-user-dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { User } from '../user.entity';

class UsersRepository implements Repository {
  findById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findAll(loginSubstring?: any, limit?: any): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  create(dto: CreateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(id: string, dto: UpdateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
}

export { UsersRepository };
