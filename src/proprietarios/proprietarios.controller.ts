import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ProprietariosService } from './proprietarios.service';
import { CreateProprietarioDto } from './dto/create-proprietario.dto';
import { UpdateProprietarioDto } from './dto/update-proprietario.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Proprietarios')
@Controller('proprietarios')
export class ProprietariosController {
  constructor(private readonly proprietariosService: ProprietariosService) { }

  @Post()
  @ApiOperation({ summary: 'Criar um novo proprietário' })
  @ApiResponse({ status: 201, description: 'O proprietário foi criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @ApiResponse({ status: 409, description: 'Proprietário com este CPF já existe.' })
  create(@Body() createProprietarioDto: CreateProprietarioDto) {
    return this.proprietariosService.create(createProprietarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os proprietários' })
  @ApiResponse({ status: 200, description: 'Lista de proprietários retornada com sucesso.' })
  findAll() {
    return this.proprietariosService.findAll();
  }

  @Get(':cpf_prop')
  @ApiOperation({ summary: 'Obter um proprietário pelo CPF' })
  @ApiResponse({ status: 200, description: 'Proprietário retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Proprietário não encontrado.' })
  findOne(@Param('cpf_prop') cpf_prop: string) {
    return this.proprietariosService.findOne(cpf_prop);
  }

  @Patch(':cpf_prop')
  @ApiOperation({ summary: 'Atualizar um proprietário pelo CPF' })
  @ApiResponse({ status: 200, description: 'O proprietário foi atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @ApiResponse({ status: 404, description: 'Proprietário não encontrado.' })
  update(@Param('cpf_prop') cpf_prop: string, @Body() updateProprietarioDto: UpdateProprietarioDto) {
    return this.proprietariosService.update(cpf_prop, updateProprietarioDto);
  }

  @Delete(':cpf_prop')
  @ApiOperation({ summary: 'Remover um proprietário pelo CPF' })
  @ApiResponse({ status: 200, description: 'O proprietário foi removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Proprietário não encontrado.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('cpf_prop') cpf_prop: string) {
    return this.proprietariosService.remove(cpf_prop);
  }
}
