import { Request } from 'express';
import { Service } from 'typedi';
import { asyncWrapper } from '../utils/asyncWrapper';
import { SuccessResponse } from '../utils/SuccessResponse';
import { StatusCodes } from 'http-status-codes';
import { ICreatePost } from '../interfaces/post.interface';
import { PostService } from '../services/post.service';

@Service()
export default class PostController {
  constructor(
    public postService: PostService,
  ) { }

  public createUserPost = asyncWrapper(async (req: Request) => {
    const { title, content } = req.body as ICreatePost;
    const { id } = req.params;
    const response = await this.postService.createPost({ title, content, userId: id });
    return new SuccessResponse('Post Created Successful', response, StatusCodes.CREATED);
  });

  public getUserPosts = asyncWrapper(async (req: Request) => {
    const { id } = req.params;
    const response = await this.postService.findUserPosts(id);
    return new SuccessResponse('User Posts fetched Successfully', response);
  });
}
