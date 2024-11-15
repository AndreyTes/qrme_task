import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsPhoneNumber, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Andrey' })
  @IsString()
  @Length(1, 300)
  firstName: string;

  @ApiProperty({ example: 'Tes' })
  @IsString()
  @Length(1, 300)
  lastName: string;

  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+7-900-000-00-00' })
  @IsPhoneNumber()
  phone: string;
}
