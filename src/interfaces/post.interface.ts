import { User } from "../models/user.model";

export interface ICreatePost {
  title: string;
  content: string;
  userId: string;
}

export interface IComment {
  content: string;
  user: User;
  postId: string;
}