import * as postRepository from "./posts.repository";
import { CreatePostDTO, IPost, UpdatePostDTO } from "../../types/post-type";
import {
  DatabaseError,
  PostNotFoundError,
  PostValidationError,
} from "../../errors/AppError";
import { server } from "../../server";

export async function getAllPosts(): Promise<IPost[]> {
  try {
    server.log.info("Iniciando busca de todos os posts");
    const posts = await postRepository.findAll();
    server.log.info(
      `Busca concluída com sucesso. ${posts.length} posts encontrados`
    );
    return posts;
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    server.log.error("Erro ao buscar posts:", error);
    throw new DatabaseError("Erro ao buscar posts");
  }
}

export async function getPostById(id: number): Promise<IPost> {
  try {
    server.log.info(`Iniciando busca do post com ID: ${id}`);
    const post = await postRepository.findById(id);
    server.log.info(`Post com ID ${id} encontrado com sucesso`);
    return post;
  } catch (error) {
    server.log.error(`Erro ao buscar post com ID ${id}:`, error);
    throw error;
  }
}

export async function createPost(data: CreatePostDTO): Promise<IPost> {
  try {
    server.log.info("Iniciando validação e criação de novo post");

    if (data.title.length < 3) {
      server.log.warn("Título muito curto");
      throw new PostValidationError(
        "O título deve ter pelo menos 3 caracteres"
      );
    }
    if (data.content.length < 10) {
      server.log.warn("Conteúdo muito curto");
      throw new PostValidationError(
        "O conteúdo deve ter pelo menos 10 caracteres"
      );
    }
    if (data.author_name.length < 2) {
      server.log.warn("Nome do autor muito curto");
      throw new PostValidationError(
        "O nome do autor deve ter pelo menos 2 caracteres"
      );
    }

    const post = await postRepository.create(data);
    server.log.info("Post criado com sucesso:", post);
    return post;
  } catch (error) {
    server.log.error("Erro ao criar post:", error);
    throw error;
  }
}

export async function deletePost(id: number): Promise<void> {
  try {
    server.log.info(`Iniciando remoção do post com ID: ${id}`);
    await postRepository.remove(id);
    server.log.info(`Post com ID ${id} removido com sucesso`);
  } catch (error) {
    server.log.error(`Erro ao remover post com ID ${id}:`, error);
    throw error;
  }
}

export async function updatePost(
  id: number,
  data: UpdatePostDTO
): Promise<IPost> {
  try {
    server.log.info(`Iniciando atualização do post com ID: ${id}`, data);
    const updatedPost = await postRepository.update(id, data);
    server.log.info(`Post com ID ${id} atualizado com sucesso:`, updatedPost);
    return updatedPost;
  } catch (error) {
    server.log.error(`Erro ao atualizar post com ID ${id}:`, error);
    throw error;
  }
}
