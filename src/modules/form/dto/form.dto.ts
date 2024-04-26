export class FormObjectDto {
  id: number;
  title: string;
  questions: QuestionDto[];

  getQuestionsWithFormId(id): Array<QuestionDto> {
    return this.questions.map((question) => ({ ...question, formId: id }));
  }
}

export class FormDto {
  id: number;
  title: string;
}

export class QuestionDto {
  id: number;
  formId: number;
  label: string;
  type: QuestionType;
}

export enum QuestionType {
  ShortText = 'ShortText',
  Number = 'Number',
}
