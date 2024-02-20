export type Comment = {
  id: string;
  text: string;
  parentId: string;
  user: {
    name: string;
    email: string;
  };
  createdAt: Date;
  image?: {
    id:  string;
    name: string;
    url:  string;
  }, 
  file?: {
    id:  string;
    name: string;
    url:  string;
  }, 
  comments: Comment[];
}

export type CommentCreate = {
  name:  string;
  email:  string;
  homePage?:  string;
  text: string;
  image: File;
  file: File;
  parentId: string;
  captсha: string;
}