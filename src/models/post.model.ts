import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { User } from "./user.model";

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
