import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt, IsEnum } from 'class-validator';
import { AddressType } from '../addresses.entity';

export class CreateAddressDto {
  @ApiProperty({ example: 'Taganrog' })
  @IsString()
  @Length(1, 300)
  city: string;

  @ApiProperty({ example: 'Chehova' })
  @IsString()
  @Length(1, 300)
  street: string;

  @ApiProperty({ example: 100 })
  @IsInt()
  houseNumber: number;

  @ApiProperty({ example: 'work' })
  @IsEnum(AddressType)
  address_type: AddressType;
}
