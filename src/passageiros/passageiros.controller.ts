import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PassageirosService } from './passageiros.service';
import { CreatePassageiroDto } from './dto/create-passageiro.dto';
import { UpdatePassageiroDto } from './dto/update-passageiro.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Passageiros')
@Controller('passageiros')
export class PassageirosController {
  constructor(private readonly passageirosService: PassageirosService) { }

  @Post()
  @ApiOperation({ summary: 'Criar um novo passageiro' })
  @ApiResponse({ status: 201, description: 'O passageiro foi criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @ApiResponse({ status: 409, description: 'Passageiro com este CPF já existe.' })
  create(@Body() createPassageiroDto: CreatePassageiroDto) {
    return this.passageirosService.create(createPassageiroDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os passageiros' })
  @ApiResponse({ status: 200, description: 'Lista de passageiros retornada com sucesso.' })
  findAll() {
    return this.passageirosService.findAll();
  }

  @Get(':cpf_passag')
  @ApiOperation({ summary: 'Obter um passageiro pelo CPF' })
  @ApiResponse({ status: 200, description: 'Passageiro retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Passageiro não encontrado.' })
  findOne(@Param('cpf_passag') cpf_passag: string) {
    return this.passageirosService.findOne(cpf_passag);
  }

  @Patch(':cpf_passag')
  @ApiOperation({ summary: 'Atualizar um passageiro pelo CPF' })
  @ApiResponse({ status: 200, description: 'O passageiro foi atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @ApiResponse({ status: 404, description: 'Passageiro não encontrado.' })
  update(@Param('cpf_passag') cpf_passag: string, @Body() updatePassageiroDto: UpdatePassageiroDto) {
    return this.passageirosService.update(cpf_passag, updatePassageiroDto);
  }

  @Delete(':cpf_passag')
  @ApiOperation({ summary: 'Remover um passageiro pelo CPF' })
  @ApiResponse({ status: 200, description: 'O passageiro foi removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Passageiro não encontrado.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('cpf_passag') cpf_passag: string) {
    return this.passageirosService.remove(cpf_passag);
  }
}
