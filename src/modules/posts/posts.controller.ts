import { FastifyReply, FastifyRequest } from "fastify";
import * as postsService from "./posts.service";
import { CreatePostDTO } from "../../types/post-type";

export async function getAllPostsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const posts = await postsService.getAllPosts();
    return reply.status(200).send(posts);
  } catch (error) {
    throw error;
  }
}
export async function getPostByIdController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const post = await postsService.getPostById(Number(request.params.id));
    return reply.status(200).send(post);
  } catch (error) {
    throw error;
  }
}
export async function createPostController(
  request: FastifyRequest<{ Body: CreatePostDTO }>,
  reply: FastifyReply
) {
  try {
    const post = await postsService.createPost(request.body);
    return reply.status(201).send(post);
  } catch (error) {
    throw error;
  }
}
