import { AppDataSource } from '../database/data-source';
import { Comment } from '../models/comment.model';

export const CommentRepository = AppDataSource.getRepository(Comment).extend({})