import { IsUUID } from 'class-validator';

export class GroupParamsDto {
  @IsUUID(4, { each: true, message: 'Group ID must be UUIDv4 format' })
  id: string;
}
