import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { Post } from "./post.model";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    email: string;

    @IsNotEmpty()
    @Column()
    firstName: string;

    @IsNotEmpty()
    @Column()
    lastName: string;

    @IsNotEmpty()
    @Column({ select: false })
    password: string;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
