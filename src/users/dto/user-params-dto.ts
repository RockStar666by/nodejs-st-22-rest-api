import { IsUUID } from 'class-validator';

export class UserParamsDto {
  @IsUUID(4, { each: true, message: 'User ID must be UUIDv4 format' })
  id: string;
}
