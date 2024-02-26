import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UpdateCommentDto } from './dto/UpdateComment';
import { CreateCommentDto } from './dto/CreateComment';
import { CreateUserDto } from './dto/CreateUserDto';
import { FileService } from './files/app.service';
import { File, Image } from '@prisma/client';
import { CaptchaService } from './captcha/captcha.service';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
    private readonly captchaService: CaptchaService,
  ) {}

  async getRootComments(
    page: number = 0,
    count: number = 24,
    sort: {
      name?: string | null;
      email?: string | null;
      createdAt?: string | null;
    },
  ) {
    const skip = (page - 1) * count;

    const orderBy = [];
    if (sort.name) {
      orderBy.push({ user: { name: sort.name === 'asc' ? 'asc' : 'desc' } });
    }
    if (sort.email) {
      orderBy.push({ user: { email: sort.email === 'asc' ? 'asc' : 'desc' } });
    }
    if (sort.createdAt) {
      orderBy.push({ createdAt: sort.createdAt === 'asc' ? 'asc' : 'desc' });
    } else {
      orderBy.push({ createdAt: 'desc' });
    }

    const comments = await this.prisma.comment.findMany({
      skip,
      take: count,
      where: {
        parentId: null,
      },
      include: {
        user: true,
        image: true,
        file: true,
        comments: {
          include: {
            user: true,
            image: true,
            file: true,
            comments: true,
          },
        },
      },
      orderBy: orderBy,
    });
    return comments;
  }

  async getCommentById(id: string) {
    console.log('id: string', id);
    try {
      return await this.prisma.comment.findUnique({
        where: {
          id,
        },
        include: {
          user: true,
          image: true,
          file: true,
          comments: {
            include: {
              user: true,
              image: true,
              file: true,
              comments: true,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025')
        throw new NotFoundException('Comment was not found');
    }
  }

  async createComment(dto: CreateCommentDto) {
    let existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.data.email,
      },
    });

    if (!existingUser) {
      const createUserDto: CreateUserDto = {
        name: dto.data.name,
        email: dto.data.email,
        homePage: dto.data.homePage || null,
      };
      existingUser = await this.prisma.user.create({
        data: createUserDto,
      });
    }

    let imageObj: Image | null = null;
    let fileObj: File | null = null;

    if (dto.data.image) {
      const image = await this.fileService.saveImage(dto.data.image);
      imageObj = (await this.prisma.image.create({
        data: { path: image.path, name: image.name },
      })) as Image;
    }

    if (dto.data.file) {
      const file = await this.fileService.saveTextFile(dto.data.file as Buffer);
      fileObj = (await this.prisma.file.create({
        data: { path: file.path, name: file.name },
      })) as File;
    }

    const comment = await this.prisma.comment.create({
      data: {
        userId: existingUser.id,
        text: dto.data.text,
        parentId: dto.data.parentId,
        image: imageObj
          ? {
              connect: {
                id: imageObj.id,
              },
            }
          : undefined,
        file: fileObj
          ? {
              connect: {
                id: fileObj.id,
              },
            }
          : undefined,
      },
    });

    return comment;
  }

  updateComment(id: string, updateCommentDto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id },
      data: { text: updateCommentDto.text },
    });
  }

  async removeComment(id: string) {
    try {
      await this.prisma.comment.delete({
        where: {
          id,
        },
      });
      return { message: 'Comment deleted successfully' };
    } catch (error) {
      if (error.code === 'P2025')
        throw new NotFoundException('Comment was not found');
    }
  }
}
