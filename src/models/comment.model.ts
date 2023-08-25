import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { Post } from './post.model';
import { User } from './user.model';

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  content: string;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @Index()
  @ManyToOne(() => Post, post => post.comments)
  post: Post;
}
