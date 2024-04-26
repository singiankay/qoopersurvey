import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ResponseService } from './response.service';
import { RoleDecorator } from '../auth/decorators/role.decorator';
import { Role } from '@prisma/client';
import { FastifyRequest } from 'fastify';
import { AuthService } from '../auth/auth.service';
import { ResponseItemDto } from './dto/response.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('form/:formId/response')
export class ResponseController {
  constructor(
    private readonly responseService: ResponseService,
    private readonly authService: AuthService,
  ) {}
  @Get('all')
  @ApiOperation({
    summary: 'Get Responses By Id',
    description: 'Returns Responses',
    operationId: 'getResponses',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiParam({
    name: 'formId',
    description: 'Form ID',
    required: true,
    type: Number,
  })
  @RoleDecorator([Role.Admin])
  async getResponses(
    @Req() req: FastifyRequest,
    @Param('formId', new ParseIntPipe()) formId: number,
  ) {
    return this.responseService.getResponses(formId);
  }

  @Get()
  @RoleDecorator([Role.User, Role.Admin])
  async getResponse(
    @Req() req: FastifyRequest,
    @Param('formId', new ParseIntPipe()) formId: number,
  ) {
    const headers = await this.authService.getHeaders(
      req.headers.authorization,
    );
    return this.responseService.getResponse(headers.id, formId);
  }

  @Post()
  @RoleDecorator([Role.User])
  async createResponse(
    @Req() req: FastifyRequest,
    @Param('formId', new ParseIntPipe()) formId: number,
  ) {
    const headers = await this.authService.getHeaders(
      req.headers.authorization,
    );
    if (this.isUserSubmittedResponse(req.headers.authorization, formId)) {
      throw new BadRequestException('Response already submitted!');
    }
    return this.responseService.createResponse(headers.id, formId);
  }

  @Post(':responseId/items')
  @RoleDecorator([Role.User])
  async createResponseItems(
    @Body() responseItems: ResponseItemDto[],
    @Req() req: FastifyRequest,
    @Param('formId', new ParseIntPipe()) formId: number,
    @Param('responseId', new ParseIntPipe()) responseId: number,
  ) {
    return this.responseService.createResponseItems(responseId, responseItems);
  }

  @Patch(':responseId/items/:id')
  @RoleDecorator([Role.User])
  async updateResponseItem(
    @Body() responseItem: ResponseItemDto,
    @Req() req: FastifyRequest,
    @Param('responseId', new ParseIntPipe()) responseId: number,
    @Param('id', new ParseIntPipe()) responseItemId: number,
  ) {
    await this.isUserResponseOwner(req.headers.authorization, responseId);

    return this.responseService.updateResponseItem(
      responseItemId,
      responseItem,
    );
  }

  private async isUserResponseOwner(headerAuth, responseId) {
    const headers = await this.authService.getHeaders(headerAuth);
    const user = await this.responseService.getResponseUser(responseId);
    if (headers.id != user) {
      throw new UnauthorizedException(
        'You are not allwowed to update the record!.',
      );
    }
    return true;
  }

  private async isUserSubmittedResponse(headerAuth, formId) {
    const headers = await this.authService.getHeaders(headerAuth);
    const response = await this.responseService.getResponseCountByUser(
      headers.id,
      formId,
    );
    return response == 0;
  }
}
