import { ApiProperty } from '@nestjs/swagger';

export enum QuestionType {
  ShortText = 'ShortText',
  Number = 'Number',
}

export class FormObjectDto {
  @ApiProperty({
    description: 'Form Id',
  })
  id: number;

  @ApiProperty({
    description: 'Form title',
  })
  title: string;

  @ApiProperty({
    description: 'Questions Array',
  })
  questions: QuestionDto[];

  getQuestionsWithFormId(id): Array<QuestionDto> {
    return this.questions.map((question) => ({ ...question, formId: id }));
  }
}

export class FormDto {
  @ApiProperty({
    description: 'Form Id',
  })
  id: number;

  @ApiProperty({
    description: 'Form title',
  })
  title: string;
}

export class QuestionDto {
  @ApiProperty({
    description: 'Question Id',
  })
  id: number;

  @ApiProperty({
    description: 'Form Id',
  })
  formId: number;

  @ApiProperty({
    description: 'Form label',
  })
  label: string;

  @ApiProperty({
    description: 'Question Type',
    enum: QuestionType,
  })
  type: QuestionType;
}
