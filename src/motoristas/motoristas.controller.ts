import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { MotoristasService } from './motoristas.service';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Motoristas')
@Controller('motoristas')
export class MotoristasController {
  constructor(private readonly motoristasService: MotoristasService) { }

  @Post()
  @ApiOperation({ summary: 'Criar um novo motorista' })
  @ApiResponse({ status: 201, description: 'O motorista foi criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @ApiResponse({ status: 409, description: 'Motorista com este CPF já existe.' })
  create(@Body() createMotoristaDto: CreateMotoristaDto) {
    return this.motoristasService.create(createMotoristaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os motoristas' })
  @ApiResponse({ status: 200, description: 'Lista de motoristas retornada com sucesso.' })
  findAll() {
    return this.motoristasService.findAll();
  }

  @Get(':cpf_motorista')
  @ApiOperation({ summary: 'Obter um motorista pelo CPF' })
  @ApiResponse({ status: 200, description: 'Motorista retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado.' })
  findOne(@Param('cpf_motorista') cpf_motorista: string) {
    return this.motoristasService.findOne(cpf_motorista);
  }

  @Patch(':cpf_motorista')
  @ApiOperation({ summary: 'Atualizar um motorista pelo CPF' })
  @ApiResponse({ status: 200, description: 'O motorista foi atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado.' })
  update(@Param('cpf_motorista') cpf_motorista: string, @Body() updateMotoristaDto: UpdateMotoristaDto) {
    return this.motoristasService.update(cpf_motorista, updateMotoristaDto);
  }

  @Delete(':cpf_motorista')
  @ApiOperation({ summary: 'Remover um motorista pelo CPF' })
  @ApiResponse({ status: 200, description: 'O motorista foi removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('cpf_motorista') cpf_motorista: string) {
    return this.motoristasService.remove(cpf_motorista);
  }
}
