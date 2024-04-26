import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({
    description: 'Response Id',
  })
  id: number;

  @ApiProperty({
    description: 'Form Id',
  })
  formId: number;

  @ApiProperty({
    description: 'User Id',
  })
  userId: number;
}

export class ResponseObjectDto {
  @ApiProperty({
    description: 'Response Id',
  })
  id: number;

  @ApiProperty({
    description: 'Form Id',
  })
  formId: number;

  @ApiProperty({
    description: 'User Id',
  })
  userId: number;

  @ApiProperty({
    description: 'Response Item Array',
  })
  responseItem: ResponseItemDto[];
}

export class ResponseItemDto {
  @ApiProperty({
    description: 'Response Item Id',
  })
  id: number;

  @ApiProperty({
    description: 'Response Id',
  })
  responseId: number;

  @ApiProperty({
    description: 'Question Id',
  })
  questionId: number;

  @ApiProperty({
    description: 'User Answer',
  })
  answer: string | number;
}
