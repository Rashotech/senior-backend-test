import express from 'express';
import { Container } from 'typedi';
import PostController from '../controllers/post.controller';
import RequestValidator from '../middlewares/validate.middleware';
import AuthMiddleware from '../middlewares/auth.middleware';
import { CommentValidation } from '../validations/comment/comment.validation';

const router = express.Router();

const postController = Container.get(PostController);
const authMiddleware = Container.get(AuthMiddleware);

router.post('/users/:id/posts',  postController.createUserPost);
router.get('/users/:id/posts', postController.getUserPosts);
router.post('/posts/:postId/comments', authMiddleware.verifyUserToken, 
  RequestValidator.validate(CommentValidation), postController.postComment);

export default router;