import { Service } from 'typedi';
import { ICreatePost } from '../interfaces/post.interface';
import { Post } from '../models/post.model';
import { PostRepository } from '../repositories/post.repository';
import { UserService } from './user.service';

@Service()
export class PostService {
  constructor(
    private userService: UserService
  ) { }

  public async createPost(data: ICreatePost): Promise<Post> {
    const user = await this.userService.findById(data.userId);
    const post = { content: data.content, title: data.title, user }
    const newPost = await PostRepository.save(post);
    return newPost;
  }

  public async findUserPosts(id: string): Promise<Post[]> {
    const user = await this.userService.findById(id);
    return await PostRepository.find({  where: { user: { id: user.id } } });
  }
}