import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateViagemDto } from './dto/create-viagem.dto';
import { UpdateViagemDto } from './dto/update-viagem.dto';

@Injectable()
export class ViagemService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createViagemDto: CreateViagemDto) {
    const viagem = await this.prisma.viagem.create({
      data: {
        ...createViagemDto,
        cpf_mot_viag: BigInt(createViagemDto.cpf_mot_viag),
        cpf_pass_viag: BigInt(createViagemDto.cpf_pass_viag),
      },
      include: {
        motorista: true,
        passageiro: true,
        veiculo: true,
      },
    });

    return this.toViagemDto(viagem);
  }

  async findAll() {
    const viagens = await this.prisma.viagem.findMany({
      include: {
        motorista: true,
        passageiro: true,
        veiculo: true,
      },
    });
    return viagens.map(this.toViagemDto);
  }

  async findOne(cpf_mot_viag: string, cpf_pass_viag: string, placa_veic_viag: string) {
    const viagem = await this.prisma.viagem.findUnique({
      where: {
        cpf_pass_viag_cpf_mot_viag_placa_veic_viag: {
          cpf_mot_viag: BigInt(cpf_mot_viag),
          cpf_pass_viag: BigInt(cpf_pass_viag),
          placa_veic_viag,
        },
      },
      include: {
        motorista: true,
        passageiro: true,
        veiculo: true,
      },
    });

    if (!viagem) {
      throw new NotFoundException('Viagem não encontrada');
    }

    return this.toViagemDto(viagem);
  }

  async update(cpf_mot_viag: string, cpf_pass_viag: string, placa_veic_viag: string, updateViagemDto: UpdateViagemDto) {
    await this.findOne(cpf_mot_viag, cpf_pass_viag, placa_veic_viag);
    const viagem = await this.prisma.viagem.update({
      where: {
        cpf_pass_viag_cpf_mot_viag_placa_veic_viag: {
          cpf_mot_viag: BigInt(cpf_mot_viag),
          cpf_pass_viag: BigInt(cpf_pass_viag),
          placa_veic_viag,
        },
      },
      data: {
        ...updateViagemDto,
        cpf_mot_viag: updateViagemDto.cpf_mot_viag ? BigInt(updateViagemDto.cpf_mot_viag) : undefined,
        cpf_pass_viag: updateViagemDto.cpf_pass_viag ? BigInt(updateViagemDto.cpf_pass_viag) : undefined,
      },
      include: {
        motorista: true,
        passageiro: true,
        veiculo: true,
      },
    });
    return this.toViagemDto(viagem);
  }

  async remove(cpf_mot_viag: string, cpf_pass_viag: string, placa_veic_viag: string) {
    await this.findOne(cpf_mot_viag, cpf_pass_viag, placa_veic_viag);
    const viagem = await this.prisma.viagem.delete({
      where: {
        cpf_pass_viag_cpf_mot_viag_placa_veic_viag: {
          cpf_mot_viag: BigInt(cpf_mot_viag),
          cpf_pass_viag: BigInt(cpf_pass_viag),
          placa_veic_viag,
        },
      },
      include: {
        motorista: true,
        passageiro: true,
        veiculo: true,
      },
    });
    return this.toViagemDto(viagem);
  }

  private toViagemDto(viagem: any) {
    return {
      ...viagem,
      cpf_mot_viag: viagem.cpf_mot_viag.toString(),
      cpf_pass_viag: viagem.cpf_pass_viag.toString(),
      motorista: viagem.motorista ? {
        ...viagem.motorista,
        cpf_motorista: viagem.motorista.cpf_motorista.toString(),
      } : null,
      passageiro: viagem.passageiro ? {
        ...viagem.passageiro,
        cpf_passag: viagem.passageiro.cpf_passag.toString(),
      } : null,
      veiculo: viagem.veiculo ? {
        ...viagem.veiculo,
        veiculo_proprietarios__fk: viagem.veiculo.veiculo_proprietarios__fk.toString(),
      } : null,
    };
  }
  async getViagensByMarca(marca: string, data: string, horaInicio: string, horaFim: string) {
    const parseDate = (dateString: string): Date | null => {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date;
    };
  
    const startDateTimeString = `${data}T${horaInicio}Z`;
    const endDateTimeString = `${data}T${horaFim}Z`;
  
    console.log(startDateTimeString, endDateTimeString);
  
    const inicio = parseDate(startDateTimeString);
    const fim = parseDate(endDateTimeString);
  
    console.log(inicio, fim);
  
    if (!inicio || !fim) {
      throw new Error('Data ou hora inválida');
    }
  
    const viagens = await this.prisma.viagem.findMany({
      where: {
        veiculo: {
          marca: marca,
        },
        dt_hora_inicio: {
          gte: inicio,
          lte: fim,
        },
      },
      include: {
        motorista: {
          select: { cpf_motorista: true },
        },
        passageiro: {
          select: { cpf_passag: true },
        },
        veiculo: {
          select: { marca: true, placa: true },
        },
      },
    });
  
    return viagens.map(viagem => ({
      marca: viagem.veiculo.marca,
      placa: viagem.veiculo.placa,
      localOrigem: viagem.local_orig_viag,
      localDestino: viagem.local_dest_viag,
      nomeMotorista: viagem.motorista.cpf_motorista.toString(),
      nomePassageiro: viagem.passageiro.cpf_passag.toString(),
    }));
  }
  
  
  async getMaioresFaturamentos(ano: number, mes: number) {
    const parseDate = (year: number, month: number, day: number): Date => {
      return new Date(Date.UTC(year, month - 1, day));
    };
  
    const startDate = parseDate(ano, mes, 1);
    const endDate = parseDate(ano, mes + 1, 0);
  
    const viagens = await this.prisma.viagem.findMany({
      where: {
        dt_hora_inicio: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        motorista: {
          select: { cpf_motorista: true },
        },
        passageiro: {
          select: { cpf_passag: true },
        },
        veiculo: {
          select: { marca: true, placa: true },
        },
      },
    });
  
    const faturamentosMap = viagens.reduce((acc, viagem) => {
      const key = viagem.veiculo.placa;
      if (!acc[key]) {
        acc[key] = {
          marca: viagem.veiculo.marca,
          placa: viagem.veiculo.placa,
          valorTotal: 0,
          viagens: [],
        };
      }
      acc[key].valorTotal += parseFloat(viagem.valor_pagto.toString());
      acc[key].viagens.push({
        localOrigem: viagem.local_orig_viag,
        localDestino: viagem.local_dest_viag,
        nomeMotorista: viagem.motorista.cpf_motorista.toString(),
        nomePassageiro: viagem.passageiro.cpf_passag.toString(),
        valorPagamento: viagem.valor_pagto.toString(),
      });
      return acc;
    }, {});
  
    const faturamentos = Object.values(faturamentosMap).sort((a, b) => (b as any).valorTotal - (a as any).valorTotal).slice(0, 20);
  
    return faturamentos;
  }
  


  async getFaturamentoPorVeiculo(ano: number, mes: number) {
    const inicio = new Date(Date.UTC(ano, mes - 1, 1));
    const fim = new Date(Date.UTC(ano, mes, 0, 23, 59, 59));
  
    const viagens = await this.prisma.viagem.findMany({
      where: {
        dt_hora_inicio: {
          gte: inicio,
          lte: fim,
        },
      },
      include: {
        motorista: {
          select: { cpf_motorista: true },
        },
        veiculo: {
          select: { placa: true, marca: true },
        },
      },
    });
  
    type Faturamento = {
      placa: string;
      marca: string;
      motorista: bigint;
      valorTotal: number;
    };
  
    const faturamentosMap = viagens.reduce<Record<string, Faturamento>>((acc, viagem) => {
      const key = viagem.placa_veic_viag;
      if (!acc[key]) {
        acc[key] = {
          placa: viagem.veiculo.placa,
          marca: viagem.veiculo.marca,
          motorista: viagem.motorista.cpf_motorista,
          valorTotal: 0,
        };
      }
      acc[key].valorTotal += parseFloat(viagem.valor_pagto?.toString() || '0');
      return acc;
    }, {});
  
    const faturamentos = Object.values(faturamentosMap).sort((a, b) => b.valorTotal - a.valorTotal);
  
    const resultados = await Promise.all(
      faturamentos.map(async (faturamento) => {
        const pessoa = await this.prisma.pessoas.findUnique({
          where: { cpf_pessoa: BigInt(faturamento.motorista) },
          select: { nome: true },
        });
  
        return {
          placaVeiculo: faturamento.placa,
          marcaVeiculo: faturamento.marca,
          nomeMotorista: pessoa?.nome || 'Nome não encontrado',
          valorTotalFaturado: faturamento.valorTotal,
        };
      })
    );
  
    return resultados;
  }
  
  

  async getMediaMensalViagens(anoInicio: number, anoFim: number) {
    const inicio = new Date(anoInicio, 0, 1);
    const fim = new Date(anoFim, 11, 31, 23, 59, 59);

    console.log('inicio', inicio, 'fim', fim);

    const viagens = await this.prisma.viagem.findMany({
      where: {
        dt_hora_inicio: {
          gte: inicio,
          lte: fim,
        },
      },
      include: {
        passageiro: true, // Não inclui 'pessoa', apenas 'passageiro'
      },
    });

    type ContagemPorSexo = { M: number; F: number };
    type ViagensPorMes = Record<string, ContagemPorSexo>;

    const viagensPorMesESexo: ViagensPorMes = viagens.reduce((acc, viagem) => {
      if (!viagem.passageiro) {
        return acc; // Ignorar viagens sem passageiro
      }

      const mesAno = `${viagem.dt_hora_inicio.getFullYear()}-${viagem.dt_hora_inicio.getMonth() + 1}`;
      const sexo = viagem.passageiro.sexo;

      console.log('mesAno', mesAno, 'sexo', sexo);

      if (!acc[mesAno]) {
        acc[mesAno] = { M: 0, F: 0 };
      }

      if (sexo) {
        acc[mesAno][sexo] += 1;
      }
      return acc;
    }, {} as ViagensPorMes);

    const totalAnos = anoFim - anoInicio + 1;

    const mediaMensal = Object.entries(viagensPorMesESexo).map(([mesAno, contagem]) => {
      const [ano, mes] = mesAno.split('-').map(Number);
      return {
        ano,
        mes,
        mediaMasculina: contagem.M / totalAnos,
        mediaFeminina: contagem.F / totalAnos,
      };
    });

    return mediaMensal;
  }
}