import * as postRepository from "./posts.repository";
import { CreatePostDTO, IPost } from "../../types/post-type";
import {
  DatabaseError,
  PostNotFoundError,
  PostValidationError,
} from "../../errors/AppError";

export async function getAllPosts(): Promise<IPost[]> {
  try {
    return await postRepository.findAll();
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    throw new DatabaseError("Erro ao buscar posts");
  }
}
export async function getPostById(id: number): Promise<IPost> {
  try {
    return await postRepository.findById(id);
  } catch (error) {
    throw error;
  }
}
export async function createPost(data: CreatePostDTO): Promise<IPost> {
  try {
    if (data.title.length < 3) {
      throw new PostValidationError(
        "O título deve ter pelo menos 3 caracteres"
      );
    }
    if (data.content.length < 10) {
      throw new PostValidationError(
        "O conteúdo deve ter pelo menos 10 caracteres"
      );
    }
    if (data.author_name.length < 2) {
      throw new PostValidationError(
        "O nome do autor deve ter pelo menos 2 caracteres"
      );
    }

    return await postRepository.create(data);
  } catch (error) {
    throw error;
  }
}
export async function deletePost(id: number): Promise<void> {
  try {
    return await postRepository.remove(id);
  } catch (error) {
    throw error;
  }
}
