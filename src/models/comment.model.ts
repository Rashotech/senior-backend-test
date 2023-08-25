import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './post.model';
import { User } from './user.model';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  content: string;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @ManyToOne(() => Post, post => post.comments)
  post: Post;
}
