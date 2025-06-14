import { server } from "../../server";
import { CreatePostDTO, IPost } from "../../types/post-type";
import { DatabaseError, PostNotFoundError } from "../../errors/AppError";

export async function findAll(): Promise<IPost[]> {
  const client = await server.pg.connect();
  try {
    const query = "SELECT * FROM posts ORDER BY created_at DESC";
    const result = await client.query(query);
    return result.rows as IPost[];
  } catch (error) {
    throw new DatabaseError(
      "Não foi possível carregar os posts no banco de dados"
    );
  } finally {
    client.release();
  }
}
export async function findById(id: number): Promise<IPost> {
  const client = await server.pg.connect();
  try {
    const query = "SELECT * FROM posts WHERE id = $1";
    const result = await client.query(query, [id]);

    if (result.rows.length === 0) {
      throw new PostNotFoundError(`Post com ID ${id} não encontrado`);
    }

    return result.rows[0] as IPost;
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      throw error;
    }
    throw new DatabaseError("Não foi possível buscar o post no banco de dados");
  } finally {
    client.release();
  }
}
export async function create(data: CreatePostDTO): Promise<IPost> {
  const client = await server.pg.connect();
  try {
    const query = `
      INSERT INTO posts (title, content, author_name)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [data.title, data.content, data.author_name];
    const result = await client.query(query, values);
    return result.rows[0] as IPost;
  } catch (error) {
    throw new DatabaseError("Não foi possível criar o post no banco de dados");
  } finally {
    client.release();
  }
}
