import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateAddressDto } from './dtos/createAddressDto';
import { AddressService } from './addresses.service';
import { Address } from './addresses.entity';
import { UpdateAddressDto } from './dtos/updateAddressDto';

@ApiTags('Addresses')
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOkResponse({ type: CreateAddressDto })
  @Post('/')
  async create(
    @Body() createAddressDto: CreateAddressDto,
    @Param('userId') userId: number,
  ): Promise<Address> {
    return await this.addressService.create(createAddressDto, userId);
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Address> {
    return await this.addressService.findOne(id);
  }

  @ApiOkResponse({ type: UpdateAddressDto })
  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    return await this.addressService.update(id, updateAddressDto);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.addressService.delete(id);
  }
}
