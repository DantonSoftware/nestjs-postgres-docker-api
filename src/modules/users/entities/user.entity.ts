import { Exclude } from 'class-transformer';
import { Role } from '../../../common/enums/role.enum';
import { Post } from '../../posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name!: string;

  @Column({
    type: 'varchar',
    length: 150,
    unique: true,
  })
  email!: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 255,
  })
  password!: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role!: Role;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive!: boolean;

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];
}