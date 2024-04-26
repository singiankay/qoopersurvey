import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FormDto, FormObjectDto } from './dto/form.dto';

@Injectable()
export class FormService {
  constructor(private prisma: PrismaService) {}

  async getForm(id: number) {
    try {
      return this.prisma.form.findUnique({
        where: { id },
        include: { questions: true },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  async getForms() {
    try {
      return this.prisma.form.findMany();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async createForm(form: FormDto) {
    try {
      return this.prisma.form.create({
        data: { title: form.title },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async createFormWithQuestions(form: FormObjectDto) {
    const resultForm = await this.prisma.form.create({
      data: { title: form.title },
    });

    if (form.questions?.length) {
      const questions = form.getQuestionsWithFormId(resultForm.id);
      const resultQuestions = await this.prisma.question.createMany({
        data: questions,
      });
      if (!resultQuestions.count) {
        throw new BadGatewayException('Something wrong happened.');
      }
      return {
        form_id: resultForm.id,
        question_id_count: resultQuestions.count,
      };
    }
    return {
      form_id: resultForm.id,
      question_id_count: 0,
    };
  }

  async updateForm(form: FormDto) {
    try {
      return this.prisma.form.update({
        where: {
          id: form.id,
        },
        data: {
          title: form.title,
        },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async deleteForm(id: number) {
    try {
      const form = await this.getForm(id);
      const responses = await this.prisma.response.findMany({
        select: {
          id: true,
        },
        where: {
          formId: form.id,
        },
      });
      await this.prisma.responseItem.deleteMany({
        where: {
          responseId: { in: responses.map((item) => item.id) },
        },
      });
      await this.prisma.response.deleteMany({ where: { formId: form.id } });
      await this.prisma.question.deleteMany({ where: { formId: form.id } });
      await this.prisma.form.delete({ where: { id } });
      return { success: true };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
