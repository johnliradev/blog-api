import { FastifyReply, FastifyRequest } from "fastify";
import * as postsService from "./posts.service";
import { CreatePostDTO, UpdatePostDTO } from "../../types/post-type";
import { server } from "../../server";

export async function getAllPostsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  server.log.info("Iniciando busca de todos os posts");
  const posts = await postsService.getAllPosts();
  server.log.info(
    `Busca concluída com sucesso. ${posts.length} posts encontrados`
  );
  return reply.status(200).send(posts);
}

export async function getPostByIdController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);
  server.log.info(`Iniciando busca do post com ID: ${id}`);
  const post = await postsService.getPostById(id);
  server.log.info(`Post com ID ${id} encontrado com sucesso`);
  return reply.status(200).send(post);
}

export async function createPostController(
  request: FastifyRequest<{ Body: CreatePostDTO }>,
  reply: FastifyReply
) {
  server.log.info("Iniciando criação de novo post:", request.body);
  const post = await postsService.createPost(request.body);
  server.log.info("Post criado com sucesso:", post);
  return reply.status(201).send(post);
}

export async function deletePostByIdController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);
  server.log.info(`Iniciando remoção do post com ID: ${id}`);
  await postsService.deletePost(id);
  server.log.info(`Post com ID ${id} removido com sucesso`);
  return reply.code(204).send();
}

export async function updatePostByIdController(
  request: FastifyRequest<{ Params: { id: string }; Body: UpdatePostDTO }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);
  const data = request.body;
  server.log.info(`Iniciando atualização do post com ID: ${id}`, data);
  const updatedPost = await postsService.updatePost(id, data);
  server.log.info(`Post com ID ${id} atualizado com sucesso:`, updatedPost);
  return reply.code(202).send(updatedPost);
}
