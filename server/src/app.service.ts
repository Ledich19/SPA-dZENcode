import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UpdateCommentDto } from './dto/UpdateComment';
import { CreateCommentDto } from './dto/CreateComment';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getRootComments() {
    return this.prisma.comment.findMany({
      where: {},
    });
  }

  getCommentById(id: string) {
    return this.prisma.comment.findUnique({
      where: {
        id,
      },
    });
  }

  async createComment(data: CreateCommentDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        name: data.name,
        email: data.email,
      },
    });

    if (!existingUser) {
      const createUserDto: CreateUserDto = {
        name: data.name,
        email: data.email,
        homePage: data.homePage || null,
      };
      await this.prisma.user.create({
        data: createUserDto,
      });
    }

    return this.prisma.comment.create({
      data: { text: data.text, userId: '' },
    });
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
