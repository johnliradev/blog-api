import { FastifyReply, FastifyRequest } from "fastify";
import * as postsServices from "./posts.service";

export async function getAllPostsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const posts = await postsServices.getAllPosts();
    return reply.status(200).send(posts);
  } catch (error) {
    return reply.status(500).send(error);
  }
}
