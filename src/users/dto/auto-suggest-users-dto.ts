import { IsOptional, IsString } from 'class-validator';
export class AutoSuggestUsersDto {
  @IsString()
  @IsOptional()
  loginSubstring: string;

  @IsString()
  @IsOptional()
  limit: string;
}
