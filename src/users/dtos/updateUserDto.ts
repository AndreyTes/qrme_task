import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  Length,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Ivan' })
  @IsOptional()
  @IsString()
  @Length(1, 300)
  firstName: string;

  @ApiProperty({ example: 'Ivanov' })
  @IsOptional()
  @IsString()
  @Length(1, 300)
  lastName: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+7-999-999-99-99' })
  @IsOptional()
  @IsPhoneNumber()
  phone: string;
}
