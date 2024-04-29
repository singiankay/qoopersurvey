import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionDto } from '../form/dto/form.dto';
import { PrismaService } from '../../../src/prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}
  async getQuestions(formId: number) {
    try {
      return this.prisma.question.findMany({
        where: {
          formId,
        },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getQuestion(id: number) {
    try {
      return this.prisma.question.findUnique({ where: { id } });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async createQuestion(formId: number, question: QuestionDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...payload } = question;
    try {
      return await this.prisma.question.create({
        data: {
          formId,
          ...payload,
        },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async createQuestions(formId: number, questions: QuestionDto[]) {
    try {
      return this.prisma.question.createMany({
        data: questions.map((q) => ({ ...q, formId })),
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async updateQuestion(id: number, question: QuestionDto) {
    try {
      return this.prisma.question.update({
        where: { id },
        data: { ...question, id },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async deleteQuestion(id: number) {
    try {
      return this.prisma.question.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
