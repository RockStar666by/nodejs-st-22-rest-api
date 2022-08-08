import { Repository } from '../../interfaces/group.repository.interface';
import { CreateGroupDto } from '../dto/create-group-dto';
import { UpdateGroupDto } from '../dto/update-group-dto';
import { Group } from '../group.entity';

class GroupsRepository implements Repository {
  findById(id: string): Promise<Group> {
    throw new Error('Method not implemented.');
  }
  findAll(loginSubstring?: any, limit?: any): Promise<Group[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<Group> {
    throw new Error('Method not implemented.');
  }
  create(dto: CreateGroupDto): Promise<Group> {
    throw new Error('Method not implemented.');
  }
  update(id: string, dto: UpdateGroupDto): Promise<Group> {
    throw new Error('Method not implemented.');
  }
}

export { GroupsRepository };
