import { FastifyReply, FastifyRequest } from "fastify";
import * as postsService from "./posts.service";
import { CreatePostDTO } from "../../types/post-type";

export async function getAllPostsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const posts = await postsService.getAllPosts();
  return reply.status(200).send(posts);
}
export async function getPostByIdController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const post = await postsService.getPostById(Number(request.params.id));
  return reply.status(200).send(post);
}
export async function createPostController(
  request: FastifyRequest<{ Body: CreatePostDTO }>,
  reply: FastifyReply
) {
  const post = await postsService.createPost(request.body);
  return reply.status(201).send(post);
}
export async function deletePostByIdController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  await postsService.deletePost(Number(id));
  return reply.code(204).send();
}
