import * as postRepository from "./posts.repository";
import { IPost } from "../../types/post-type";
import { DatabaseError } from "../../errors/AppError";

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
