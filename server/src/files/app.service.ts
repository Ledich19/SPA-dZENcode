import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import * as sharp from 'sharp';
import * as fs from 'fs';

@Injectable()
export class FileService {
  async saveImage(image: Buffer, type: string = 'jpg') {
    try {
      const publicPath = 'public/images';
      if (!fs.existsSync(publicPath)) {
        await fs.promises.mkdir(publicPath, { recursive: true });
      }
      const uniqueId = randomUUID();

      const resizedImageBuffer = await sharp(image)
        .resize({ width: 320, height: 240, fit: 'cover' })
        .toBuffer();

      await fs.promises.writeFile(
        `${publicPath}/${uniqueId}.${type}`,
        resizedImageBuffer,
      );

      return { message: 'File saved successfully', id: uniqueId };
    } catch (error) {
      console.error('Error saving file:', error);
      throw error;
    }
  }

  async saveTextFile(textBuffer: Buffer, fileName: string = 'file.txt') {
    const maxFileSizeKB = parseInt(process.env.MAX_FILE_SIZE_KB, 10);
    const fileSizeKB = textBuffer.length / 1024;

    if (fileSizeKB > maxFileSizeKB) {
      throw new HttpException(
        `File size exceeds the maximum allowed size of ${maxFileSizeKB} KB`,
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const publicPath = 'public/documents/';
      if (!fs.existsSync(publicPath)) {
        await fs.promises.mkdir(publicPath, { recursive: true });
      }
      const uniqueId = randomUUID();

      await fs.promises.writeFile(
        `${publicPath}${uniqueId}---${fileName}`,
        textBuffer,
      );

      return { message: 'File saved successfully', id: uniqueId };
    } catch (error) {
      console.error('Error saving file:', error);
      throw error;
    }
  }
}
