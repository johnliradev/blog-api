import { server } from "../../server";
import { IPost } from "../../types/post-type";

export async function findAll(): Promise<IPost[]> {
  const client = await server.pg.connect();
  try {
    const query = "SELECT * FROM posts";
    const result = await client.query(query);
    return result.rows as IPost[];
  } catch (error) {
    throw new Error(
      "Não foi possível carregar os posts no banco de dados. Tente novamente mais tarde"
    );
  } finally {
    client.release();
  }
}
