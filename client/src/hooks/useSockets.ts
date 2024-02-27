import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Comment,
  CommentCreate,
  UseSocketsHook,
} from "../types/comments.types";
import { SortDirection } from "../types/enums";
import socket from "./socketInstance";

export const useSockets = (): UseSocketsHook => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [log, setLog] = useState<string>();

  useEffect(() => {
    socket.on("log", (log: string) => {
      setLog(log);
    });

    socket.on("comment:post", (payload: Comment) => {
      if (payload.parentId) {
        socket.emit("comment:id", { id: payload.parentId });
      }
      if (payload.id) {
        socket.emit("comment:id", { id: payload.id });
      }
    });

    socket.on("comment:id", (payload: Comment) => {
      if (!payload) return;
      if (!payload.parentId) {
        setComments((prevComments) => {
          const existingIndex = prevComments.findIndex(
            (comment) => comment.id === payload.id
          );
          if (existingIndex !== -1) {
            return prevComments;
          }
          return [payload, ...prevComments];
        });
      } else {
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
      }
    });

    socket.on(
      "comments:get",
      (payload: { total: number; comments: Comment[] }) => {
        setTotal(payload.total);
        setComments(payload.comments);
      }
    );
    socket.emit("comments:get");
  }, []);

  const getAll = useCallback(
    (payload: {
      page: number;
      pageSize: number;
      sort: {
        name: SortDirection | null;
        email: SortDirection | null;
        createdAt: SortDirection | null;
      };
    }) => {
      socket.emit("comments:get", payload);
    },
    []
  );

  const getById = useCallback((payload: { id: string }) => {
    socket.emit("comment:id", payload);
  }, []);

  const send = useCallback((payload: { data: CommentCreate }) => {
    socket.emit("comment:post", payload);
  }, []);

  const update = useCallback(
    (payload: { id: string; rootId: string | null; data: CommentCreate }) => {
      socket.emit("comment:put", payload);
    },
    []
  );

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

  return { comments, total, log, actions };
};
