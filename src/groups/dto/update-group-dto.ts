import { IsString, IsOptional, IsNotEmpty, IsArray } from 'class-validator';
import { Permission } from '../group.entity';

export class UpdateGroupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @IsOptional()
  permissions: Permission[];
}
