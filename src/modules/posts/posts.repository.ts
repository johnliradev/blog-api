import { server } from "../../server";
import { CreatePostDTO, IPost, UpdatePostDTO } from "../../types/post-type";
import { DatabaseError, PostNotFoundError } from "../../errors/AppError";

export async function findAll(): Promise<IPost[]> {
  const client = await server.pg.connect();
  try {
    server.log.info("Buscando todos os posts");
    const query = "SELECT * FROM posts ORDER BY created_at DESC";
    const result = await client.query(query);
    server.log.info(`Encontrados ${result.rows.length} posts`);
    return result.rows as IPost[];
  } catch (error) {
    server.log.error("Erro ao buscar posts:", error);
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
    server.log.info(`Buscando post com ID: ${id}`);
    const query = "SELECT * FROM posts WHERE id = $1";
    const result = await client.query(query, [id]);

    if (result.rows.length === 0) {
      server.log.warn(`Post com ID ${id} não encontrado`);
      throw new PostNotFoundError(`Post com ID ${id} não encontrado`);
    }

    server.log.info(`Post com ID ${id} encontrado com sucesso`);
    return result.rows[0] as IPost;
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      throw error;
    }
    server.log.error(`Erro ao buscar post com ID ${id}:`, error);
    throw new DatabaseError("Não foi possível buscar o post no banco de dados");
  } finally {
    client.release();
  }
}

export async function create(data: CreatePostDTO): Promise<IPost> {
  const client = await server.pg.connect();
  try {
    server.log.info("Criando novo post:", data);
    const query = `
      INSERT INTO posts (title, content, author_name)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [data.title, data.content, data.author_name];
    const result = await client.query(query, values);
    server.log.info("Post criado com sucesso:", result.rows[0]);
    return result.rows[0] as IPost;
  } catch (error) {
    server.log.error("Erro ao criar post:", error);
    throw new DatabaseError("Não foi possível criar o post no banco de dados");
  } finally {
    client.release();
  }
}

export async function remove(id: number): Promise<void> {
  const client = await server.pg.connect();
  try {
    server.log.info(`Iniciando remoção do post com ID: ${id}`);
    await findById(id);
    const deleteQuery = "DELETE FROM posts WHERE id = $1";
    await client.query(deleteQuery, [id]);
    server.log.info(`Post com ID ${id} removido com sucesso`);
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      throw error;
    }
    server.log.error(`Erro ao remover post com ID ${id}:`, error);
    throw new DatabaseError(
      "Não foi possível deletar o post no banco de dados."
    );
  } finally {
    client.release();
  }
}

export async function update(id: number, data: UpdatePostDTO): Promise<IPost> {
  const client = await server.pg.connect();
  try {
    server.log.info(`Iniciando atualização do post com ID: ${id}`, data);
    await findById(id);
    const fields = [];
    const values = [];
    let index = 1;

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        fields.push(`${key} = $${index}`);
        values.push(value);
        index++;
      }
    }

    if (fields.length === 0) {
      server.log.warn("Nenhum campo para atualizar");
      throw new DatabaseError("Nenhum campo para atualizar.");
    }

    const query = `
      UPDATE posts
      SET ${fields.join(", ")}
      WHERE id = $${index}
      RETURNING *
    `;
    values.push(id);

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      server.log.warn(`Post com ID ${id} não encontrado durante atualização`);
      throw new PostNotFoundError(`Post com ID ${id} não encontrado`);
    }

    server.log.info(
      `Post com ID ${id} atualizado com sucesso:`,
      result.rows[0]
    );
    return result.rows[0] as IPost;
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      throw error;
    }
    server.log.error(`Erro ao atualizar post com ID ${id}:`, error);
    throw new DatabaseError(
      "Não foi possível atualizar o post no banco de dados."
    );
  } finally {
    client.release();
  }
}
