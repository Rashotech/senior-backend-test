import express from 'express';
import { Container } from 'typedi';
import PostController from '../controllers/post.controller';

const router = express.Router();

const postController = Container.get(PostController);

router.post('/users/:id/posts',  postController.createUserPost);
router.get('/users/:id/posts', postController.getUserPosts);

export default router;