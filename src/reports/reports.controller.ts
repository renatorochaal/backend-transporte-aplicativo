import {Controller, Get, Query} from '@nestjs/common';
import {ReportsService} from './reports.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('Relatórios')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {
  }

  @Get('viagensPorMarcaEMomento')
  @ApiOperation({summary: 'Obter viagens por marca e momento'})
  @ApiResponse({status: 200, description: 'Viagens retornadas com sucesso.'})
  async viagensPorMarcaEMomento(@Query('marca') marca: string, @Query('inicio') inicio: string, @Query('fim') fim: string) {
    const inicioDate = new Date(inicio);
    const fimDate = new Date(fim);
    return this.reportsService.viagensPorMarcaEMomento(marca, inicioDate, fimDate);
  }

  @Get('topFaturamentos')
  @ApiOperation({summary: 'Obter top faturamentos'})
  @ApiResponse({status: 200, description: 'Faturamentos retornados com sucesso.'})
  async topFaturamentos(@Query('mes') mes: number, @Query('ano') ano: number, @Query('top') top: number) {
    return this.reportsService.topFaturamentos(mes, ano, top);
  }

  @Get('faturamentoPorVeiculoEMes')
  @ApiOperation({summary: 'Obter faturamento por veículo e mês'})
  @ApiResponse({status: 200, description: 'Faturamentos retornados com sucesso.'})
  async faturamentoPorVeiculoEMes(@Query('mes') mes: number, @Query('ano') ano: number) {
    return this.reportsService.faturamentoPorVeiculoEMes(mes, ano);
  }

  @Get('mediaPassageirosPorSexoEMes')
  @ApiOperation({summary: 'Obter média de passageiros por sexo e mês'})
  @ApiResponse({status: 200, description: 'Média retornada com sucesso.'})
  async mediaPassageirosPorSexoEMes(@Query('sexo') sexo: string) {
    return this.reportsService.mediaPassageirosPorSexoEMes(sexo);
  }
}
