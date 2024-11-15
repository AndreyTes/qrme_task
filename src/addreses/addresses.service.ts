import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './addresses.entity';
import { CreateAddressDto } from './dtos/createAddressDto';
import { User } from 'src/users/users.entity';
import { UpdateAddressDto } from './dtos/updateAddressDto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressesRepository: Repository<Address>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<Address> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const address = this.addressesRepository.create({
      ...createAddressDto,
      user,
    });
    return await this.addressesRepository.save(address);
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.addressesRepository.findOne({
      where: { id },
    });
    if (!address) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return address;
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.findOne(id);
    const updatedAddress = Object.assign(address, updateAddressDto);
    return await this.addressesRepository.save(updatedAddress);
  }

  async delete(id: number): Promise<void> {
    const address = await this.findOne(id);
    if (!address) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.addressesRepository.remove(address);
  }
}
