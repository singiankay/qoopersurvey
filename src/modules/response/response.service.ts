import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { ResponseItemDto } from './dto/response.dto';

@Injectable()
export class ResponseService {
  constructor(private readonly prisma: PrismaService) {}

  async getResponses(formId: number) {
    try {
      return this.prisma.response.findMany({
        where: { formId },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstname: true,
              lastname: true,
              role: true,
            },
          },
          items: true,
        },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getResponse(userId: number, formId) {
    try {
      return this.prisma.form.findFirst({
        where: { id: { equals: formId } },
        include: {
          questions: {
            include: { responseItem: true },
          },
          responses: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  firstname: true,
                  lastname: true,
                  role: true,
                },
              },
            },
            where: {
              userId: {
                equals: userId,
              },
            },
          },
        },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getResponseUser(responseId: number) {
    try {
      const response = await this.prisma.response.findUniqueOrThrow({
        where: {
          id: responseId,
        },
      });
      return response.userId;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getResponseCountByUser(userId: number, formId: number) {
    try {
      const count = await this.prisma.response.count({
        where: { userId, formId },
      });
      console.log(count);
      return count;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async createResponse(userId, formId) {
    try {
      return this.prisma.response.create({
        data: { formId, userId },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async createResponseItems(
    responseId: number,
    responseItems: ResponseItemDto[],
  ) {
    const data = responseItems.map((item) => ({
      ...item,
      answer: `${item.answer}`,
    }));
    try {
      return this.prisma.responseItem.createMany({ data });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async updateResponseItem(id: number, item: ResponseItemDto) {
    try {
      return this.prisma.responseItem.update({
        where: { id },
        data: {
          ...item,
          id,
          answer: `${item.answer}`,
        },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
