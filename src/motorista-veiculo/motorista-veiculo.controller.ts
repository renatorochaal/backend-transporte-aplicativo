import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { MotoristaVeiculoService } from './motorista-veiculo.service';
import { CreateMotoristaVeiculoDto } from './dto/create-motorista-veiculo.dto';
import { UpdateMotoristaVeiculoDto } from './dto/update-motorista-veiculo.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('MotoristaVeiculo')
@Controller('motorista-veiculo')
export class MotoristaVeiculoController {
  constructor(private readonly motoristaVeiculoService: MotoristaVeiculoService) { }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova associação entre motorista e veículo' })
  @ApiResponse({ status: 201, description: 'A associação foi criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @ApiResponse({ status: 409, description: 'Associação entre motorista e veículo já existe.' })
  create(@Body() createMotoristaVeiculoDto: CreateMotoristaVeiculoDto) {
    return this.motoristaVeiculoService.create(createMotoristaVeiculoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as associações entre motoristas e veículos' })
  @ApiResponse({ status: 200, description: 'Lista de associações retornada com sucesso.' })
  findAll() {
    return this.motoristaVeiculoService.findAll();
  }

  @Get(':cpf_motorista/:placa_veiculo')
  @ApiOperation({ summary: 'Obter uma associação entre motorista e veículo pelo CPF do motorista e pela placa do veículo' })
  @ApiResponse({ status: 200, description: 'Associação retornada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Associação não encontrada.' })
  findOne(@Param('cpf_motorista') cpf_motorista: string, @Param('placa_veiculo') placa_veiculo: string) {
    return this.motoristaVeiculoService.findOne(cpf_motorista, placa_veiculo);
  }

  @Patch(':cpf_motorista/:placa_veiculo')
  @ApiOperation({ summary: 'Atualizar uma associação entre motorista e veículo pelo CPF do motorista e pela placa do veículo' })
  @ApiResponse({ status: 200, description: 'A associação foi atualizada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @ApiResponse({ status: 404, description: 'Associação não encontrada.' })
  update(@Param('cpf_motorista') cpf_motorista: string, @Param('placa_veiculo') placa_veiculo: string, @Body() updateMotoristaVeiculoDto: UpdateMotoristaVeiculoDto) {
    return this.motoristaVeiculoService.update(cpf_motorista, placa_veiculo, updateMotoristaVeiculoDto);
  }

  @Delete(':cpf_motorista/:placa_veiculo')
  @ApiOperation({ summary: 'Remover uma associação entre motorista e veículo pelo CPF do motorista e pela placa do veículo' })
  @ApiResponse({ status: 200, description: 'A associação foi removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Associação não encontrada.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('cpf_motorista') cpf_motorista: string, @Param('placa_veiculo') placa_veiculo: string) {
    return this.motoristaVeiculoService.remove(cpf_motorista, placa_veiculo);
  }
}
