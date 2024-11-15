import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt, IsEnum, IsOptional } from 'class-validator';
import { AddressType } from '../addresses.entity';

export class UpdateAddressDto {
  @ApiProperty({ example: 'Rostov' })
  @IsOptional()
  @IsString()
  @Length(1, 300)
  city: string;

  @ApiProperty({ example: 'Lermontova' })
  @IsOptional()
  @IsString()
  @Length(1, 300)
  street: string;

  @ApiProperty({ example: 10 })
  @IsOptional()
  @IsInt()
  houseNumber: number;

  @ApiProperty({ example: 'home' })
  @IsOptional()
  @IsEnum(AddressType)
  address_type: AddressType;
}
