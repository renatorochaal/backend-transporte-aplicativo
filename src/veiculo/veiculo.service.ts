import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';

@Injectable()
export class VeiculoService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createVeiculoDto: CreateVeiculoDto) {
    const existingVeiculo = await this.prisma.veiculo.findUnique({
      where: { placa: createVeiculoDto.placa },
    });

    if (existingVeiculo) {
      throw new ConflictException('Veículo com esta placa já existe');
    }

    const veiculo = await this.prisma.veiculo.create({
      data: {
        ...createVeiculoDto,
        veiculo_proprietarios__fk: BigInt(createVeiculoDto.veiculo_proprietarios__fk),
      },
      include: {
        motoristaVeiculos: true,
        proprietario: true,
        viagens: true,
      },
    });

    return this.toVeiculoDto(veiculo);
  }

  async findAll() {
    const veiculos = await this.prisma.veiculo.findMany({
      include: {
        motoristaVeiculos: true,
        proprietario: true,
        viagens: true,
      },
    });
    return veiculos.map(this.toVeiculoDto);
  }

  async findOne(placa: string) {
    const veiculo = await this.prisma.veiculo.findUnique({
      where: { placa },
      include: {
        motoristaVeiculos: true,
        proprietario: true,
        viagens: true,
      },
    });

    if (!veiculo) {
      throw new NotFoundException('Veículo não encontrado');
    }

    return this.toVeiculoDto(veiculo);
  }

  async update(placa: string, updateVeiculoDto: UpdateVeiculoDto) {
    await this.findOne(placa);
    const veiculo = await this.prisma.veiculo.update({
      where: { placa },
      data: {
        ...updateVeiculoDto,
        veiculo_proprietarios__fk: updateVeiculoDto.veiculo_proprietarios__fk ? BigInt(updateVeiculoDto.veiculo_proprietarios__fk) : undefined,
      },
      include: {
        motoristaVeiculos: true,
        proprietario: true,
        viagens: true,
      },
    });
    return this.toVeiculoDto(veiculo);
  }

  async remove(placa: string) {
    await this.findOne(placa);
    const veiculo = await this.prisma.veiculo.delete({
      where: { placa },
      include: {
        motoristaVeiculos: true,
        proprietario: true,
        viagens: true,
      },
    });
    return this.toVeiculoDto(veiculo);
  }

  private toVeiculoDto(veiculo: any) {
    return {
      ...veiculo,
      veiculo_proprietarios__fk: veiculo.veiculo_proprietarios__fk.toString(),
      motoristaVeiculos: veiculo.motoristaVeiculos ? veiculo.motoristaVeiculos.map((mv: any) => ({
        ...mv,
        cpf_motorista: mv.cpf_motorista.toString(),
      })) : [],
      proprietario: veiculo.proprietario ? {
        ...veiculo.proprietario,
        cpf_prop: veiculo.proprietario.cpf_prop.toString(),
      } : null,
      viagens: veiculo.viagens ? veiculo.viagens.map((viagem: any) => ({
        ...viagem,
        cpf_mot_viag: viagem.cpf_mot_viag.toString(),
        cpf_pass_viag: viagem.cpf_pass_viag.toString(),
      })) : [],
    };
  }
}
