export interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  tags?: string[];
}
export interface CreateArticleSchema {
  title: string;
  content: string;
  tags?: string[];
}
