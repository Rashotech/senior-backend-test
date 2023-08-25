import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { User } from "./user.model";
import { Comment } from "./comment.model";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    title: string;

    @IsNotEmpty()
    @Column()
    content: string;

    @ManyToOne(() => User, user => user.posts)
    user: User;

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
