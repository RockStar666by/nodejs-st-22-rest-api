import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
class SequelizeUsersRepository implements UsersRepository {
  findById(): User {
    throw new Error('Method not implemented.');
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

export { SequelizeUsersRepository };
