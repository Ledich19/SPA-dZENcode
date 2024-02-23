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
    socket.on("log", (log: string) => {
      setLog(log);
    });

    // получение обновлений
    socket.on("comment:post", (payload: Comment) => {
      console.log("POST", payload.parentId);

      socket.emit("comment:id", { id: payload.parentId });
    });

    // получение по id
    socket.on("comment:id", (payload: Comment) => {
      setComments((prevComments) => {
        const updatedComments = [...prevComments];
        const updateCommentByParentId = (rootComment: Comment) => {
          if (rootComment && rootComment.id === payload.id) {
            rootComment.comments = payload.comments;
            return;
          }
          if (!rootComment.comments) return;
          for (const subComment of rootComment.comments) {
            updateCommentByParentId(subComment);
          }
        };
        updatedComments.forEach(updateCommentByParentId);
        return updatedComments;
      });
    });

    // получение сообщений
    socket.on("comments:get", (payload: { type: string; data: Comment[] }) => {
      setComments(payload.data);
    });
    socket.emit("comments:get");
  }, []);

  // получение сообщений
  const getAll = useCallback((payload: { page: number; pageSize: number }) => {
    socket.emit("comments:get", payload);
    // подключение/отключение пользователя
  }, []);

  // получение сообщений
  const getById = useCallback((payload: { id: string }) => {
    console.log("socket.emit(comment:id, payload);");

    socket.emit("comment:id", payload);
  }, []);

  // отправка сообщения
  const send = useCallback((payload: { data: CommentCreate }) => {
    socket.emit("comment:post", payload);
  }, []);

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
