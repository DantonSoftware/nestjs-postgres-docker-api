import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async create(name: string, email: string, password: string): Promise<User> {
    const existingUser = await this.usersRepository.findOneBy({ email });

    if (existingUser) {
      throw new ConflictException(`User with email ${email} already exists`);
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      role: Role.USER,
    });

    return this.usersRepository.save(newUser);
  }

  async update(id: number, name?: string, email?: string): Promise<User> {
    const user = await this.findOne(id);

    if (email && email !== user.email) {
      const existingUser = await this.usersRepository.findOneBy({ email });

      if (existingUser) {
        throw new ConflictException(`User with email ${email} already exists`);
      }
    }

    if (name !== undefined) {
      user.name = name;
    }
    if (email !== undefined) {
      user.email = email;
    }

    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);

    await this.usersRepository.remove(user);

    return { message: `User with id ${id} deleted successfully` };
  }

}

