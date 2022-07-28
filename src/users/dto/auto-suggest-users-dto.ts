import { IsString } from 'class-validator';
export class AutoSuggestUsersDto {
  @IsString()
  loginSubstring: string;

  @IsString()
  limit: string;
}
