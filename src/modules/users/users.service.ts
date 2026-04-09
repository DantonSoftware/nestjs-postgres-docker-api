import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private users: User[] = [
    { id: 1, name: 'Juan Perez', email: 'juan@example.com' },
    { id: 2, name: 'Maria Lopez', email: 'maria@example.com' },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  create(name: string, email: string): User {
    const newUser: User = {
      id: this.users.length + 1,
      name,
      email,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, name?: string, email?: string): User {
    const user = this.findOne(id);

    if (name !== undefined) {
      user.name = name;
    }
    if (email !== undefined) {
      user.email = email;
    }

    return user;
  }

  remove(id: number): { message: string } {
    const user = this.findOne(id);

    this.users = this.users.filter((u) => u.id !== user.id);

    return { message: `User with id ${id} deleted successfully` };
  }

}

