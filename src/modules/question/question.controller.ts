import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionDto } from '../form/dto/form.dto';
import { Role } from '@prisma/client';
import { RoleDecorator } from '../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('form/:formId/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Get()
  @RoleDecorator([Role.User, Role.Admin])
  async getQuestions(@Param('formId', new ParseIntPipe()) formId: number) {
    return this.questionService.getQuestions(formId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get Form By Id',
    description: 'Returns Form and Questions By Form Id',
    operationId: 'getForm',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiParam({
    name: 'id',
    description: 'Form ID',
    required: true,
    type: Number,
  })
  @RoleDecorator([Role.User, Role.Admin])
  async getQuestion(@Param('id', new ParseIntPipe()) questionId: number) {
    return this.questionService.getQuestion(questionId);
  }

  @Post()
  @RoleDecorator([Role.Admin])
  async createQuestion(
    @Param('formId', new ParseIntPipe()) formId: number,
    @Body() question: QuestionDto,
  ) {
    return this.questionService.createQuestion(formId, question);
  }

  @Post('all')
  @RoleDecorator([Role.Admin])
  async createQuestions(
    @Param('formId', new ParseIntPipe()) formId: number,
    @Body() questions: QuestionDto[],
  ) {
    return this.questionService.createQuestions(formId, questions);
  }

  @Patch(':id')
  @RoleDecorator([Role.Admin])
  async updateQuestion(
    @Param('id', new ParseIntPipe()) questionId: number,
    @Body() question: QuestionDto,
  ) {
    return this.questionService.updateQuestion(questionId, question);
  }

  @Delete(':id')
  @RoleDecorator([Role.Admin])
  async deleteQuestion(@Param('id', new ParseIntPipe()) questionId: number) {
    return this.questionService.deleteQuestion(questionId);
  }
}
