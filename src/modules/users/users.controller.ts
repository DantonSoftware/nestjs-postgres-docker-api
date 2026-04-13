import { Controller, Get, ParseIntPipe, Param, Post, Body, Patch, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '../../common/enums/role.enum';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No permitido' })
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
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Eliminar un usuario' })
    @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
    @ApiResponse({ status: 200, description: 'Usuario eliminado' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No permitido' })
    remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        return this.usersService.remove(id);
    }
}
