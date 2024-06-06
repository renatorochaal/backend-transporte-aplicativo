import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
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

  @Get('marca')
  @ApiOperation({ summary: 'Obter viagens de veículos de uma marca específica em um período' })
  @ApiResponse({ status: 200, description: 'Lista de viagens retornada com sucesso.' })
  async getViagensByMarca(
    @Query('marca') marca: string,
    @Query('data') data: string,
    @Query('horaInicio') horaInicio: string,
    @Query('horaFim') horaFim: string
  ) {
    return this.viagemService.getViagensByMarca(marca, data, horaInicio, horaFim);
  }

  @Get('maiores-faturamentos')
  @ApiOperation({ summary: 'Obter os maiores faturamentos em um mês específico' })
  @ApiResponse({ status: 200, description: 'Lista dos maiores faturamentos retornada com sucesso.' })
  async getMaioresFaturamentos(
    @Query('ano') ano: number,
    @Query('mes') mes: number
  ) {
    return this.viagemService.getMaioresFaturamentos(ano, mes);
  }


  @Get('faturamento-veiculos')
  @ApiOperation({ summary: 'Obter faturamento dos veículos em um mês específico' })
  @ApiResponse({ status: 200, description: 'Faturamento dos veículos retornado com sucesso.' })
  async getFaturamentoPorVeiculo(
    @Query('ano') ano: number,
    @Query('mes') mes: number
  ) {
    return this.viagemService.getFaturamentoPorVeiculo(ano, mes);
  }

  @Get('media-mensal-viagens')
  @ApiOperation({ summary: 'Mostrar a média mensal de viagens, de passageiros de cada sexo' })
  @ApiResponse({ status: 200, description: 'Média mensal de viagens retornada com sucesso.' })
  async getMediaMensalViagens(
    @Query('anoInicio') anoInicio: number,
    @Query('anoFim') anoFim: number
  ) {
    return this.viagemService.getMediaMensalViagens(anoInicio, anoFim);
  }
}
  
