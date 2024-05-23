import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Veiculos')
@Controller('veiculos')
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) { }

  @Post()
  @ApiOperation({ summary: 'Criar um novo veículo' })
  @ApiResponse({ status: 201, description: 'O veículo foi criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @ApiResponse({ status: 409, description: 'Veículo com esta placa já existe.' })
  create(@Body() createVeiculoDto: CreateVeiculoDto) {
    return this.veiculoService.create(createVeiculoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os veículos' })
  @ApiResponse({ status: 200, description: 'Lista de veículos retornada com sucesso.' })
  findAll() {
    return this.veiculoService.findAll();
  }

  @Get(':placa')
  @ApiOperation({ summary: 'Obter um veículo pela placa' })
  @ApiResponse({ status: 200, description: 'Veículo retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado.' })
  findOne(@Param('placa') placa: string) {
    return this.veiculoService.findOne(placa);
  }

  @Patch(':placa')
  @ApiOperation({ summary: 'Atualizar um veículo pela placa' })
  @ApiResponse({ status: 200, description: 'O veículo foi atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado.' })
  update(@Param('placa') placa: string, @Body() updateVeiculoDto: UpdateVeiculoDto) {
    return this.veiculoService.update(placa, updateVeiculoDto);
  }

  @Delete(':placa')
  @ApiOperation({ summary: 'Remover um veículo pela placa' })
  @ApiResponse({ status: 200, description: 'O veículo foi removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('placa') placa: string) {
    return this.veiculoService.remove(placa);
  }
}
