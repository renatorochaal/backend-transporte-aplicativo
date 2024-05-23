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
}
