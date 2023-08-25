import { AppDataSource } from '../database/data-source';
import { Post } from '../models/post.model';

export const PostRepository = AppDataSource.getRepository(Post).extend({})