import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dtos/createUserDto';
import { UpdateUserDto } from './dtos/updateUserDto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject()
    private redisService: RedisService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['addresses'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    const updatedUser = Object.assign(user, updateUserDto);
    return await this.usersRepository.save(updatedUser);
  }

  async delete(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.remove(user);
  }

  async findUsersByQuery(
    query: { name?: string; email?: string },
    limit: number,
    page: number,
  ) {
    const cacheKey = `users:${query.name || ''}:${query.email || ''}`;
    const cachedData = await this.redisService.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const userQuery = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.addresses', 'address');

    if (query.name) {
      userQuery.where("user.firstName || ' ' || user.lastName ILIKE :name", {
        name: `%${query.name}%`,
      });
    }
    if (query.email) {
      userQuery.orWhere('user.email ILIKE :email', {
        email: `%${query.email}%`,
      });
    }

    const users = await userQuery.skip(limit).take(page).getMany();

    await this.redisService.set(cacheKey, JSON.stringify(users), 3600);
    return users;
  }

  async findUsersByAddressId(addressId: number) {
    const cacheKey = `users:by-address:${addressId}`;
    const cachedData = await this.redisService.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const users = await this.usersRepository.find({
      where: {
        addresses: {
          id: addressId,
        },
      },
      relations: ['addresses'],
    });

    await this.redisService.set(cacheKey, JSON.stringify(users), 3600);

    return users;
  }
}
