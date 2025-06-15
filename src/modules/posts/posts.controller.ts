import { FastifyReply, FastifyRequest } from "fastify";
import * as postsService from "./posts.service";
import { CreatePostDTO, UpdatePostDTO } from "../../types/post-type";

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
export async function updatePostByIdController(
  request: FastifyRequest<{ Params: { id: string }; Body: UpdatePostDTO }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const data = request.body;
  const updatedPost = await postsService.updatePost(Number(id), data);
  return reply.code(202).send(updatedPost);
}
