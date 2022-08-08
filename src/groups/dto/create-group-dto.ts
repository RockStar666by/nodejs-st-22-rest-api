import { IsArray, IsString, IsNotEmpty } from 'class-validator';
import { Permission } from '../group.entity';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  permissions: Permission[];
}
