import { Controller, Get, ParseIntPipe, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(): User[] {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): User {
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): User {
        return this.usersService.create(createUserDto.name, createUserDto.email);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): User {
        return this.usersService.update(id, updateUserDto.name, updateUserDto.email);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): { message: string } {
        return this.usersService.remove(id);
    }
}
