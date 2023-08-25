import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Index } from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { User } from "./user.model";
import { Comment } from "./comment.model";

@Entity("posts")
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    title: string;

    @IsNotEmpty()
    @Column()
    content: string;

    @Index()
    @ManyToOne(() => User, user => user.posts)
    user: User;

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
