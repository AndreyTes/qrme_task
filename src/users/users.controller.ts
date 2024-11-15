import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dtos/createUserDto';
import { UpdateUserDto } from './dtos/updateUserDto';
import { User } from './users.entity';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/search')
  @ApiQuery({ name: 'name', required: false, description: 'Имя пользователя' })
  @ApiQuery({
    name: 'email',
    required: false,
    description: 'Email пользователя',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    description: 'Количество записей на странице',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    required: true,
    description: 'Номер страницы',
    example: 1,
  })
  async findUsersByQuery(
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.userService.findUsersByQuery({ name, email }, limit, page);
  }

  @ApiOkResponse({ type: CreateUserDto })
  @Post('/')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @ApiOkResponse({ type: UpdateUserDto })
  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }

  @Get('search-by-address/:addressId')
  @ApiParam({ name: 'addressId', required: true, description: 'ID адреса' })
  async findUsersByAddressId(
    @Param('addressId', ParseIntPipe) addressId: number,
  ) {
    return this.userService.findUsersByAddressId(addressId);
  }
}
