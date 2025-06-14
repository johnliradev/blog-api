import * as postReposity from "./posts.repository";
import { IPost } from "../../types/post-type";

export async function getAllPosts(): Promise<IPost[]> {
  try {
    const posts = await postReposity.findAll();
    return posts as IPost[];
  } catch (error: any) {
    throw new Error(error);
  }
}
