import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
    constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }

  async create(title: string, content: string, userId: number): Promise<Post> {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const post = this.postsRepository.create({
      title,
      content,
      user,
    });

    return this.postsRepository.save(post);
  }

  async update(
    postId: number,
    title: string | undefined,
    content: string | undefined,
    currentUserId: number,
  ): Promise<Post> {
    const post = await this.findOne(postId);

    if (post.user.id !== currentUserId) {
      throw new ForbiddenException('You are not allowed to modify this post');
    }

    if (title !== undefined) {
      post.title = title;
    }

    if (content !== undefined) {
      post.content = content;
    }

    return this.postsRepository.save(post);
  }

  async remove(postId: number, currentUserId: number): Promise<{ message: string }> {
    const post = await this.findOne(postId);

    if (post.user.id !== currentUserId) {
      throw new ForbiddenException('You are not allowed to delete this post');
    }

    await this.postsRepository.remove(post);

    return { message: `Post with id ${postId} deleted successfully` };
  }

}
