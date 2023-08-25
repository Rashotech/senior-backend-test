import { Service } from 'typedi';
import { IComment, ICreatePost } from '../interfaces/post.interface';
import { Comment } from '../models/comment.model';
import { Post } from '../models/post.model';
import { CommentRepository } from '../repositories/comment.repository';
import { PostRepository } from '../repositories/post.repository';
import { NotFoundError } from '../utils/ApiError';
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

  public async createComment(data: IComment): Promise<Comment> {
    const { postId, content, user } = data;
    const post = await PostRepository.findOne({  where: { id: Number(postId) } });
    if(!post) throw new NotFoundError("Post does not exist");
    const comment = { content, post, user };
    return await CommentRepository.save(comment);
  }
}