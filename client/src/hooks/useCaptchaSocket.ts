import { useCallback, useEffect, useMemo, useState } from "react";
import { CaptchaSocketData } from "../types/comments.types";
import socket from "./socketInstance";



export const useCaptchaSocket = (): CaptchaSocketData => {
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [log, setLog] = useState<string>();

  useEffect(() => {
    socket.on("captcha:log", (log: string) => {
      setLog(log);
    });

    socket.on("captcha:get", (payload: { data: string }) => {
      console.log("WAS GET");
      
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
