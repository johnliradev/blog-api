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
export const CreatePostResponseSchema = PostSchema;
export const CreatePostBodySchema = Type.Object({
  title: Type.String(),
  content: Type.String(),
  author_name: Type.String(),
});
export const DeletePostParamsSchema = Type.Object({
  id: Type.Number(),
});
export const DeletePostResponseSchema = Type.Object({
  message: Type.String(),
});
export const UpdatePostParamsSchema = Type.Object({
  id: Type.Number(),
});
export const UpdatePostBodySchema = Type.Object({
  title: Type.Optional(Type.String()),
  content: Type.Optional(Type.String()),
  author_name: Type.Optional(Type.String()),
  published: Type.Optional(Type.Boolean()),
});
export const UpdatePostResponseSchema = PostSchema;
