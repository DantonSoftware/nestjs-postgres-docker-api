import { Exclude } from 'class-transformer';
import { Post } from 'src/modules/posts/entities/post.entity';
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

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];
}