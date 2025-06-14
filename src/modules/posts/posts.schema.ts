import { Type } from "@sinclair/typebox";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

export const PostSchema = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  content: Type.String(),
  author_name: Type.String(),
  published: Type.Boolean(),
  created_at: Type.String({ format: "date-time" }),
  updated_at: Type.String({ format: "date-time" }),
});

export const GetPostsResponseSchema = Type.Array(PostSchema);
export const GetPostByIdParamsSchema = Type.Object({
  id: Type.Number(),
});
export const GetPostByIdResponseSchema = PostSchema;
