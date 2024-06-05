import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async viagensPorMarcaEMomento(marca: string, inicio: Date, fim: Date) {
    return this.prisma.viagem.findMany({
      where: {
        veiculo: {
          marca: marca,
        },
        dt_hora_inicio: {
          gte: inicio,
        },
        dt_hora_fim: {
          lte: fim,
        },
      },
      include: {
        veiculo: true,
        motorista: true,
        passageiro: true,
      },
    });
  }

  async topFaturamentos(mes: number, ano: number, top: number) {
    const startDate = new Date(ano, mes - 1, 1);
    const endDate = new Date(ano, mes, 0);

    return this.prisma.viagem.findMany({
      where: {
        dt_hora_inicio: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        valor_pagto: 'desc',
      },
      take: top,
    });
  }

  async faturamentoPorVeiculoEMes(mes: number, ano: number) {

  }

  async mediaPassageirosPorSexoEMes(sexo: string) {

  }
}
