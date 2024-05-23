import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ViagemService } from './viagem.service';
import { CreateViagemDto } from './dto/create-viagem.dto';
import { UpdateViagemDto } from './dto/update-viagem.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Viagens')
@Controller('viagens')
export class ViagemController {
  constructor(private readonly viagemService: ViagemService) { }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova viagem' })
  @ApiResponse({ status: 201, description: 'A viagem foi criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  create(@Body() createViagemDto: CreateViagemDto) {
    return this.viagemService.create(createViagemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as viagens' })
  @ApiResponse({ status: 200, description: 'Lista de viagens retornada com sucesso.' })
  findAll() {
    return this.viagemService.findAll();
  }

  @Get(':cpf_pass_viag/:cpf_mot_viag/:placa_veic_viag')
  @ApiOperation({ summary: 'Obter uma viagem pelos CPFs do passageiro e do motorista e pela placa do veículo' })
  @ApiResponse({ status: 200, description: 'Viagem retornada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Viagem não encontrada.' })
  findOne(
    @Param('cpf_pass_viag') cpf_pass_viag: string,
    @Param('cpf_mot_viag') cpf_mot_viag: string,
    @Param('placa_veic_viag') placa_veic_viag: string,
  ) {
    return this.viagemService.findOne(cpf_pass_viag, cpf_mot_viag, placa_veic_viag);
  }

  @Patch(':cpf_pass_viag/:cpf_mot_viag/:placa_veic_viag')
  @ApiOperation({ summary: 'Atualizar uma viagem pelos CPFs do passageiro e do motorista e pela placa do veículo' })
  @ApiResponse({ status: 200, description: 'A viagem foi atualizada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @ApiResponse({ status: 404, description: 'Viagem não encontrada.' })
  update(
    @Param('cpf_pass_viag') cpf_pass_viag: string,
    @Param('cpf_mot_viag') cpf_mot_viag: string,
    @Param('placa_veic_viag') placa_veic_viag: string,
    @Body() updateViagemDto: UpdateViagemDto,
  ) {
    return this.viagemService.update(cpf_pass_viag, cpf_mot_viag, placa_veic_viag, updateViagemDto);
  }

  @Delete(':cpf_pass_viag/:cpf_mot_viag/:placa_veic_viag')
  @ApiOperation({ summary: 'Remover uma viagem pelos CPFs do passageiro e do motorista e pela placa do veículo' })
  @ApiResponse({ status: 200, description: 'A viagem foi removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Viagem não encontrada.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('cpf_pass_viag') cpf_pass_viag: string,
    @Param('cpf_mot_viag') cpf_mot_viag: string,
    @Param('placa_veic_viag') placa_veic_viag: string,
  ) {
    return this.viagemService.remove(cpf_pass_viag, cpf_mot_viag, placa_veic_viag);
  }
}
