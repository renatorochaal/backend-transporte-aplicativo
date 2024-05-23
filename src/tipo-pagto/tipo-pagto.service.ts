import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTipoPagtoDto } from './dto/create-tipo-pagto.dto';
import { UpdateTipoPagtoDto } from './dto/update-tipo-pagto.dto';

@Injectable()
export class TipoPagtoService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createTipoPagtoDto: CreateTipoPagtoDto) {
    const existingTipoPagto = await this.prisma.tipoPagto.findUnique({
      where: { cod_pagto: createTipoPagtoDto.cod_pagto },
    });

    if (existingTipoPagto) {
      throw new ConflictException('Tipo de pagamento com este código já existe');
    }

    const tipoPagto = await this.prisma.tipoPagto.create({
      data: createTipoPagtoDto,
    });

    return tipoPagto;
  }

  async findAll() {
    return this.prisma.tipoPagto.findMany();
  }

  async findOne(cod_pagto: number) {
    const tipoPagto = await this.prisma.tipoPagto.findUnique({
      where: { cod_pagto },
    });

    if (!tipoPagto) {
      throw new NotFoundException('Tipo de pagamento não encontrado');
    }

    return tipoPagto;
  }

  async update(cod_pagto: number, updateTipoPagtoDto: UpdateTipoPagtoDto) {
    await this.findOne(cod_pagto);
    return this.prisma.tipoPagto.update({
      where: { cod_pagto },
      data: updateTipoPagtoDto,
    });
  }

  async remove(cod_pagto: number) {
    await this.findOne(cod_pagto);
    return this.prisma.tipoPagto.delete({
      where: { cod_pagto },
    });
  }
}
