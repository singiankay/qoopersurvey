import { ApiProperty } from '@nestjs/swagger';

export class jwtDto {
  @ApiProperty({
    description: 'The encrypted access token',
  })
  access_token: string;
}

export class jwtPayloadDto {
  @ApiProperty({
    description: 'Jwt id',
  })
  id: number;

  @ApiProperty({
    description: 'Jwt Role',
  })
  role: string;
}
