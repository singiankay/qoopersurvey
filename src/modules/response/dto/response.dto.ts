export class ResponseDto {
  id: number;
  formId: number;
  userId: number;
}

export class ResponseObjectDto {
  id: number;
  formId: number;
  userId: number;
  responseItem: ResponseItemDto[];
}

export class ResponseItemDto {
  id: number;
  responseId: number;
  questionId: number;
  answer: string | number;
}
