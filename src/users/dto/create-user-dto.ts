import { IsNumber, IsString, Matches, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  @Matches(/^(?=.*\d)(?=.*[A-Za-z])[0-9a-zA-Z]{2,}$/, {
    message: 'Password should contain at least one letter and one number',
  })
  password: string;

  @Min(4, { message: 'Age should be more than 4' })
  @Max(130, { message: 'Age should be less than 130' })
  @IsNumber()
  age: number;
}
