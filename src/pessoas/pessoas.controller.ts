import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Pessoas')
@Controller('pessoas')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) { }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova pessoa' })
  @ApiResponse({ status: 201, description: 'A pessoa foi criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @ApiResponse({ status: 409, description: 'Pessoa com este CPF já existe.' })
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoasService.create(createPessoaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as pessoas' })
  @ApiResponse({ status: 200, description: 'Lista de pessoas retornada com sucesso.' })
  findAll() {
    return this.pessoasService.findAll();
  }

  @Get(':cpf_pessoa')
  @ApiOperation({ summary: 'Obter uma pessoa pelo CPF' })
  @ApiResponse({ status: 200, description: 'Pessoa retornada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Pessoa não encontrada.' })
  findOne(@Param('cpf_pessoa') cpf_pessoa: string) {
    return this.pessoasService.findOne(cpf_pessoa);
  }

  @Patch(':cpf_pessoa')
  @ApiOperation({ summary: 'Atualizar uma pessoa pelo CPF' })
  @ApiResponse({ status: 200, description: 'A pessoa foi atualizada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @ApiResponse({ status: 404, description: 'Pessoa não encontrada.' })
  update(@Param('cpf_pessoa') cpf_pessoa: string, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoasService.update(cpf_pessoa, updatePessoaDto);
  }

  @Delete(':cpf_pessoa')
  @ApiOperation({ summary: 'Remover uma pessoa pelo CPF' })
  @ApiResponse({ status: 200, description: 'A pessoa foi removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Pessoa não encontrada.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('cpf_pessoa') cpf_pessoa: string) {
    return this.pessoasService.remove(cpf_pessoa);
  }
}
