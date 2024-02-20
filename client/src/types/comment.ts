export type Comment = {
  id: number;
  text: string;
  user: {
    name: string;
    email: string;
  };
  createdAt: Date;
  comments: Comment[];
}
