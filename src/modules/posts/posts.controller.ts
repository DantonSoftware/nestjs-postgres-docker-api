import { Body, Controller, Get, Post as HttpPost } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    findAll(): Promise<Post[]> {
        return this.postsService.findAll();
    }

    @HttpPost()
    create(@Body() createPostDto: CreatePostDto): Promise<Post> {
        return this.postsService.create(
        createPostDto.title,
        createPostDto.content,
        createPostDto.userId,
        );
    }
}
