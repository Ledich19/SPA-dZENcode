import { Injectable } from '@nestjs/common';

@Injectable()
export class CaptchaService {
  private captchas: { [key: string]: { value: string; createdAt: number } } =
    {};

  private ttl = parseInt(process.env.CAPTCHA_TIME_MINUTES) * 60 * 1000;
  private cleanupInterval =
    parseInt(process.env.CLEANUP_INTERVAL_MINUTES) * 60 * 1000;

  constructor() {
    setInterval(() => this.cleanup(), this.cleanupInterval);
  }

  storeCaptcha(key: string, value: string) {
    this.captchas[key] = { value, createdAt: Date.now() };
  }

  verifyCaptcha(key: string, value: string): boolean {
    const captcha = this.captchas[key];
    console.log(this.captchas);
    console.log('__key__', key, '__value__', value);

    if (!captcha) {
      return false;
    }
    if (Date.now() - captcha.createdAt > this.ttl) {
      delete this.captchas[key];
      return false;
    }
    return captcha.value === value;
  }

  private cleanup() {
    const now = Date.now();
    for (const key in this.captchas) {
      if (now - this.captchas[key].createdAt > this.ttl) {
        delete this.captchas[key];
      }
    }
  }
}
