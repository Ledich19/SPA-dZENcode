import { SortDirection } from "./enums";

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
  captcha: string;
  parentId: string | null;
};



export interface CommentActions {
  getAll: (payload: {
    page: number;
    pageSize: number;
    sort: {
      name: SortDirection | null;
      email: SortDirection | null;
      createdAt: SortDirection | null;
    };
  }) => void;
  getById: (payload: { id: string }) => void;
  send: (payload: { data: CommentCreate }) => void;
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
  parentId: string | null;
};

export interface CaptchaSocketData {
  captcha: string | null;
  log?: string;
  actions: {
    captchaGet: () => void;
  };
}

export type ModalHandler = (parentId?: string | null) => void;
