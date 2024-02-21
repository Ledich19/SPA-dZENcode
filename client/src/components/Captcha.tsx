import { useEffect, useState } from "react";
import { useCaptchaSocket } from "../hooks/useCaptchaSocket";
import { Box } from "@mui/material";

const Captcha = () => {
  const { captcha, actions } = useCaptchaSocket();
  const [captchaImageSrc, setCaptchaImageSrc] = useState<string | null>(null);

  useEffect(() => {
    actions.captchaGet();
  }, []);

  useEffect(() => {
    if (captcha) {
      const svgDataURI = `data:image/svg+xml;base64,${btoa(captcha)}`;
      setCaptchaImageSrc(svgDataURI);
    }
  }, [captcha]);

  return (
    <Box>
      {captchaImageSrc ? (
        <img src={captchaImageSrc} alt="Captcha" />
      ) : (
        <div>Loading Captcha...</div>
      )}
    </Box>
  );
};

export default Captcha;