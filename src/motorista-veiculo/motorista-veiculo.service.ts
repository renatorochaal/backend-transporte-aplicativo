import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMotoristaVeiculoDto } from './dto/create-motorista-veiculo.dto';
import { UpdateMotoristaVeiculoDto } from './dto/update-motorista-veiculo.dto';

@Injectable()
export class MotoristaVeiculoService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createMotoristaVeiculoDto: CreateMotoristaVeiculoDto) {
    const existingMotoristaVeiculo = await this.prisma.motoristaVeiculo.findUnique({
      where: {
        cpf_motorista_placa_veiculo: {
          cpf_motorista: BigInt(createMotoristaVeiculoDto.cpf_motorista),
          placa_veiculo: createMotoristaVeiculoDto.placa_veiculo,
        },
      },
    });

    if (existingMotoristaVeiculo) {
      throw new ConflictException('Associação entre motorista e veículo já existe');
    }

    const motoristaVeiculo = await this.prisma.motoristaVeiculo.create({
      data: {
        cpf_motorista: BigInt(createMotoristaVeiculoDto.cpf_motorista),
        placa_veiculo: createMotoristaVeiculoDto.placa_veiculo,
      },
      include: {
        motorista: true,
        veiculo: true,
      },
    });

    return this.toMotoristaVeiculoDto(motoristaVeiculo);
  }

  async findAll() {
    const motoristaVeiculos = await this.prisma.motoristaVeiculo.findMany({
      include: {
        motorista: true,
        veiculo: true,
      },
    });
    return motoristaVeiculos.map(this.toMotoristaVeiculoDto);
  }

  async findOne(cpf_motorista: string, placa_veiculo: string) {
    const motoristaVeiculo = await this.prisma.motoristaVeiculo.findUnique({
      where: {
        cpf_motorista_placa_veiculo: {
          cpf_motorista: BigInt(cpf_motorista),
          placa_veiculo,
        },
      },
      include: {
        motorista: true,
        veiculo: true,
      },
    });

    if (!motoristaVeiculo) {
      throw new NotFoundException('Associação entre motorista e veículo não encontrada');
    }

    return this.toMotoristaVeiculoDto(motoristaVeiculo);
  }

  async update(cpf_motorista: string, placa_veiculo: string, updateMotoristaVeiculoDto: UpdateMotoristaVeiculoDto) {
    await this.findOne(cpf_motorista, placa_veiculo);
    const motoristaVeiculo = await this.prisma.motoristaVeiculo.update({
      where: {
        cpf_motorista_placa_veiculo: {
          cpf_motorista: BigInt(cpf_motorista),
          placa_veiculo,
        },
      },
      data: {
        ...updateMotoristaVeiculoDto,
        cpf_motorista: updateMotoristaVeiculoDto.cpf_motorista ? BigInt(updateMotoristaVeiculoDto.cpf_motorista) : undefined,
      },
      include: {
        motorista: true,
        veiculo: true,
      },
    });
    return this.toMotoristaVeiculoDto(motoristaVeiculo);
  }

  async remove(cpf_motorista: string, placa_veiculo: string) {
    await this.findOne(cpf_motorista, placa_veiculo);
    const motoristaVeiculo = await this.prisma.motoristaVeiculo.delete({
      where: {
        cpf_motorista_placa_veiculo: {
          cpf_motorista: BigInt(cpf_motorista),
          placa_veiculo,
        },
      },
      include: {
        motorista: true,
        veiculo: true,
      },
    });
    return this.toMotoristaVeiculoDto(motoristaVeiculo);
  }

  private toMotoristaVeiculoDto(motoristaVeiculo: any) {
    return {
      ...motoristaVeiculo,
      cpf_motorista: motoristaVeiculo.cpf_motorista.toString(),
      motorista: motoristaVeiculo.motorista ? {
        ...motoristaVeiculo.motorista,
        cpf_motorista: motoristaVeiculo.motorista.cpf_motorista.toString(),
      } : null,
      veiculo: motoristaVeiculo.veiculo ? {
        ...motoristaVeiculo.veiculo,
        veiculo_proprietarios__fk: motoristaVeiculo.veiculo.veiculo_proprietarios__fk.toString(),
      } : null,
    };
  }
}
