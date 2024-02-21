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
    id: string;
    name: string;
    url: string;
  };
  file?: {
    id: string;
    name: string;
    url: string;
  };
  comments: Comment[];
};

export type CommentCreate = {
  name: string;
  email: string;
  homePage?: string;
  text: string;
  image?: File | null;
  file?: string | ArrayBuffer | null;
  parentId: string | null;
};

export interface CommentActions {
  getAll: (payload: { page: string; count: number }) => void;
  getById: (payload: { id: string }) => void;
  send: (payload: { rootId: string | null; data: CommentCreate }) => void;
  update: (payload: {
    id: string;
    rootId: string;
    data: CommentCreate;
  }) => void;
  remove: (payload: { id: string }) => void;
}

export interface UseSocketsHook {
  comments: Comment[] | undefined;
  log: string | undefined;
  actions: CommentActions;
}

export type ModalState = {
  isOpen: boolean;
  rootId: string | null;
  parentId: string | null;
};

export type ModalHandler = (rootId?: string | null, parentId?: string | null) => void;