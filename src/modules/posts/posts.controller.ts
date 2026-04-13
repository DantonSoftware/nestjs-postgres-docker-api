import { Body, Controller, Delete, Get, Post as HttpPost, Param, ParseIntPipe, Patch, Query, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUserData } from '../../common/interfaces/current-user.interface';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindPostsQueryDto } from './dto/find-posts-query.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener todos los posts con su usuario' })
    @ApiResponse({ status: 200, description: 'Lista de posts' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    findAll(@Query() query: FindPostsQueryDto) {
        return this.postsService.findAll(query.page, query.limit, query.title);
    }

    @HttpPost()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Crear un post asociado a un usuario' })
    @ApiResponse({ status: 201, description: 'Post creado correctamente' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    create(@Body() createPostDto: CreatePostDto,  @CurrentUser() user: CurrentUserData,): Promise<Post> {
        return this.postsService.create(
        createPostDto.title,
        createPostDto.content,
        user.userId,
        );
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Actualizar un post propio' })
    @ApiResponse({ status: 200, description: 'Post actualizado correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No permitido' })
    @ApiResponse({ status: 404, description: 'Post no encontrado' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePostDto: UpdatePostDto,
        @CurrentUser() user: CurrentUserData,
    ): Promise<Post> {
        return this.postsService.update(
        id,
        updatePostDto.title,
        updatePostDto.content,
        user.userId,
        );
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Eliminar un post propio' })
    @ApiResponse({ status: 200, description: 'Post eliminado correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 403, description: 'No permitido' })
    @ApiResponse({ status: 404, description: 'Post no encontrado' })
    remove(
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser() user: CurrentUserData,
    ): Promise<{ message: string }> {
        return this.postsService.remove(id, user.userId);
    }
}
