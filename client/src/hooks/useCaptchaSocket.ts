import { useCallback, useEffect, useMemo, useState } from "react";
import { io, Socket } from "Socket.IO-client";
import { SERVER_URI } from "../constants";
import { CaptchaSocketData } from "../types/comments.types";

let socket: Socket;

export const useCaptchaSocket = (): CaptchaSocketData => {
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [log, setLog] = useState<string>();

  if (!socket) {
    socket = io(SERVER_URI, {
      query: {},
    });
  }

  useEffect(() => {
    socket.on("captcha:log", (log: string) => {
      setLog(log);
    });

    socket.on("captcha:get", (payload: { data: string }) => {
      setCaptcha(payload.data);
    });
    socket.emit("captcha:get");

    return () => {
      socket.off("captcha:get");
    };
  }, []);

  const captchaGet = useCallback(() => {
    console.log("GET");
    socket.emit("captcha:get");
  }, []);

  const actions = useMemo(
    () => ({
      captchaGet,
    }),
    []
  );

  return { captcha, log, actions };
};
