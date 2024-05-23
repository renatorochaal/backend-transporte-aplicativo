import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TipoPagtoService } from './tipo-pagto.service';
import { CreateTipoPagtoDto } from './dto/create-tipo-pagto.dto';
import { UpdateTipoPagtoDto } from './dto/update-tipo-pagto.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('TipoPagto')
@Controller('tipo-pagto')
export class TipoPagtoController {
  constructor(private readonly tipoPagtoService: TipoPagtoService) { }

  @Post()
  @ApiOperation({ summary: 'Criar um novo tipo de pagamento' })
  @ApiResponse({ status: 201, description: 'O tipo de pagamento foi criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @ApiResponse({ status: 409, description: 'Tipo de pagamento com este código já existe.' })
  create(@Body() createTipoPagtoDto: CreateTipoPagtoDto) {
    return this.tipoPagtoService.create(createTipoPagtoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os tipos de pagamento' })
  @ApiResponse({ status: 200, description: 'Lista de tipos de pagamento retornada com sucesso.' })
  findAll() {
    return this.tipoPagtoService.findAll();
  }

  @Get(':cod_pagto')
  @ApiOperation({ summary: 'Obter um tipo de pagamento pelo código' })
  @ApiResponse({ status: 200, description: 'Tipo de pagamento retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Tipo de pagamento não encontrado.' })
  findOne(@Param('cod_pagto') cod_pagto: number) {
    return this.tipoPagtoService.findOne(+cod_pagto);
  }

  @Patch(':cod_pagto')
  @ApiOperation({ summary: 'Atualizar um tipo de pagamento pelo código' })
  @ApiResponse({ status: 200, description: 'O tipo de pagamento foi atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @ApiResponse({ status: 404, description: 'Tipo de pagamento não encontrado.' })
  update(@Param('cod_pagto') cod_pagto: number, @Body() updateTipoPagtoDto: UpdateTipoPagtoDto) {
    return this.tipoPagtoService.update(+cod_pagto, updateTipoPagtoDto);
  }

  @Delete(':cod_pagto')
  @ApiOperation({ summary: 'Remover um tipo de pagamento pelo código' })
  @ApiResponse({ status: 200, description: 'O tipo de pagamento foi removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Tipo de pagamento não encontrado.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('cod_pagto') cod_pagto: number) {
    return this.tipoPagtoService.remove(+cod_pagto);
  }
}
