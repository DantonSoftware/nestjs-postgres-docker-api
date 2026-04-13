import { Controller, Get, ParseIntPipe, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un usuario por su ID' })
    findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear un usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado correctamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 409, description: 'Email ya registrado' })
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto.name, createUserDto.email, createUserDto.password,);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un usuario' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return this.usersService.update(id, updateUserDto.name, updateUserDto.email);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un usuario' })
    remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        return this.usersService.remove(id);
    }
}
