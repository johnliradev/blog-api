export interface IPost {
  id: number;
  title: string;
  content: string;
  author_name: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}
export interface CreatePostDTO {
  title: string;
  content: string;
  author_name: string;
}
