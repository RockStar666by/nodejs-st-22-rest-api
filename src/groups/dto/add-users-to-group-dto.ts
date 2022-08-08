import { IsArray, IsUUID } from 'class-validator';

export class AddUsersToGroupDto {
  @IsArray()
  @IsUUID(4, { each: true, message: 'Users IDs must be UUIDv4 format' })
  userIds: string[];
}
