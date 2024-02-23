import { useCallback, useEffect, useMemo, useState } from "react";
import { io, Socket } from "Socket.IO-client";
import {
  Comment,
  CommentCreate,
  UseSocketsHook,
} from "../types/comments.types";
import { SERVER_URI } from "../constants";

let socket: Socket;

export const useSockets = (): UseSocketsHook => {
  if (!socket) {
    socket = io(SERVER_URI, {
      query: {
        //userName: userInfo.userName,
      },
    });
  }

  const [comments, setComments] = useState<Comment[]>([]);
  const [log, setLog] = useState<string>();

  useEffect(() => {
    // подключение/отключение пользователя
    socket.on("log", (log: string) => {
      setLog(log);
    });

    // получение обновлений
    socket.on(
      "comment:post",
      (payload: { type: string; rootId: string; data: Comment }) => {
        const root = comments?.find((comment) => comment.id === payload.rootId);
        if (!root) return;
        insertCommentByParentId(root, payload.rootId, payload.data);
      }
    );

    // получение по id
    socket.on(
      "comment:id",
      (payload: { type: string; rootId: string; data: Comment }) => {
        const root = comments?.find((comment) => comment.id === payload.rootId);
        if (!root) return;
        insertCommentByParentId(root, payload.rootId, payload.data);
      }
    );

    // получение сообщений
    socket.on("comments:get", (payload: { type: string; data: Comment[] }) => {
      console.log('======', payload.data);
      setComments(payload.data);
    });
    socket.emit("comments:get");
  }, []);

  function insertCommentByParentId(
    comment: Comment,
    parentId: string,
    newComment: Comment
  ): void {
    if (comment.id === parentId) {
      comment.comments.push(newComment);
      return;
    }
    for (const subComment of comment.comments) {
      insertCommentByParentId(subComment, parentId, newComment);
    }
  }
  // получение сообщений
  const getAll = useCallback((payload: { page: number; pageSize: number }) => {
    socket.emit("comments:get", payload);
  }, []);

  // получение сообщений
  const getById = useCallback((payload: { id: string }) => {
    console.log("socket.emit(comment:id, payload);");
    socket.emit("comment:id", payload);
  }, []);

  // отправка сообщения
  const send = useCallback(
    (payload: { rootId: string | null; data: CommentCreate }) => {
      console.log("SENd");
      socket.emit("comment:post", {rootId: payload.rootId,data: payload.data});
    },
    []
  );

  // обновление сообщения
  const update = useCallback(
    (payload: { id: string; rootId: string | null; data: CommentCreate }) => {
      socket.emit("comment:put", payload);
    },
    []
  );

  // удаление сообщения
  const remove = useCallback((payload: { id: string }) => {
    socket.emit("comment:delete", payload);
  }, []);

  const actions = useMemo(
    () => ({
      getAll,
      send,
      getById,
      update,
      remove,
    }),
    []
  );

  return { comments, log, actions };
};
