import { CreateGroupDto } from 'src/groups/dto/create-group-dto';
import { UpdateGroupDto } from 'src/groups/dto/update-group-dto';
import { Group } from 'src/groups/group.entity';

export interface Repository {
  findById(id: string): Promise<Group>;
  findAll(loginSubstring?, limit?): Promise<Group[]>;
  delete(id: string): Promise<Group>;
  create(dto: CreateGroupDto): Promise<Group>;
  update(id: string, dto: UpdateGroupDto): Promise<Group>;
}
