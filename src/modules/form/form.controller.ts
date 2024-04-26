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
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Role } from '../auth/dto/auth.dto';
import { RoleDecorator } from '../auth/decorators/role.decorator';
import { FormDto, FormObjectDto } from './dto/form.dto';
import { FormService } from './form.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('form')
@UseGuards(JwtAuthGuard)
export class FormController {
  constructor(private readonly formService: FormService) {}

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
  @Get(':id')
  @RoleDecorator([Role.Admin, Role.User])
  async getForm(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    return this.formService.getForm(id);
  }

  @ApiOperation({
    summary: 'Get All Forms',
    description: 'Returns Forms',
    operationId: 'getForms',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Get()
  @RoleDecorator([Role.Admin, Role.User])
  async getForms(): Promise<any> {
    return this.formService.getForms();
  }

  @ApiOperation({
    summary: 'Create Form',
    description: 'Creates Form',
    operationId: 'createForm',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiBody({
    description: 'Form object',
    required: true,
    type: FormDto,
  })
  @Post()
  @RoleDecorator([Role.Admin])
  async createForm(@Body() form: FormDto): Promise<any> {
    return this.formService.createForm(form);
  }

  @ApiOperation({
    summary: 'Create Form with Questions',
    description: 'Creates Form with Questions',
    operationId: 'createFormWithQuestions',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiBody({
    description: 'Form object',
    required: true,
    type: FormObjectDto,
  })
  @Post('questions')
  @RoleDecorator([Role.Admin])
  async createFormWithQuestions(@Body() form: FormObjectDto): Promise<any> {
    return this.formService.createForm(form);
  }

  @ApiOperation({
    summary: 'Update Form',
    description: 'Updates Form',
    operationId: 'updateForm',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiBody({
    description: 'Form object',
    required: true,
    type: FormDto,
  })
  @Patch()
  @RoleDecorator([Role.Admin])
  async updateForm(@Body() form: FormDto): Promise<any> {
    return this.formService.updateForm(form);
  }

  @ApiOperation({
    summary: 'Delete Form',
    description: 'Deletes Form, Questions, Responses, and ResponseItems',
    operationId: 'deleteForm',
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
  @Delete(':id')
  @RoleDecorator([Role.Admin])
  async deleteForm(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    return this.formService.deleteForm(id);
  }
}
