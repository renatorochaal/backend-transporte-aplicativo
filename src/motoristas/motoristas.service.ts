import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';

@Injectable()
export class MotoristasService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createMotoristaDto: CreateMotoristaDto) {
    const existingMotorista = await this.prisma.motoristas.findUnique({
      where: { cpf_motorista: BigInt(createMotoristaDto.cpf_motorista) },
    });

    if (existingMotorista) {
      throw new ConflictException('Motorista com este CPF já existe');
    }

    const motorista = await this.prisma.motoristas.create({
      data: {
        ...createMotoristaDto,
        cpf_motorista: BigInt(createMotoristaDto.cpf_motorista),
      },
      include: {
        veiculos: true,
        viagens: true,
      },
    });

    return this.toMotoristaDto(motorista);
  }

  async findAll() {
    const motoristas = await this.prisma.motoristas.findMany({
      include: {
        veiculos: true,
        viagens: true,
      },
    });
    return motoristas.map(this.toMotoristaDto);
  }

  async findOne(cpf_motorista: string) {
    const motorista = await this.prisma.motoristas.findUnique({
      where: { cpf_motorista: BigInt(cpf_motorista) },
      include: {
        veiculos: true,
        viagens: true,
      },
    });

    if (!motorista) {
      throw new NotFoundException('Motorista não encontrado');
    }

    return this.toMotoristaDto(motorista);
  }

  async update(cpf_motorista: string, updateMotoristaDto: UpdateMotoristaDto) {
    await this.findOne(cpf_motorista);
    const motorista = await this.prisma.motoristas.update({
      where: { cpf_motorista: BigInt(cpf_motorista) },
      data: {
        ...updateMotoristaDto,
        cpf_motorista: updateMotoristaDto.cpf_motorista ? BigInt(updateMotoristaDto.cpf_motorista) : undefined,
      },
      include: {
        veiculos: true,
        viagens: true,
      },
    });
    return this.toMotoristaDto(motorista);
  }

  async remove(cpf_motorista: string) {
    await this.findOne(cpf_motorista);
    const motorista = await this.prisma.motoristas.delete({
      where: { cpf_motorista: BigInt(cpf_motorista) },
      include: {
        veiculos: true,
        viagens: true,
      },
    });
    return this.toMotoristaDto(motorista);
  }

  private toMotoristaDto(motorista: any) {
    return {
      ...motorista,
      cpf_motorista: motorista.cpf_motorista.toString(),
      veiculos: motorista.veiculos ? motorista.veiculos.map((veiculo: any) => ({
        ...veiculo,
        cpf_motorista: veiculo.cpf_motorista.toString(),
      })) : [],
      viagens: motorista.viagens ? motorista.viagens.map((viagem: any) => ({
        ...viagem,
        cpf_mot_viag: viagem.cpf_mot_viag.toString(),
        cpf_pass_viag: viagem.cpf_pass_viag.toString(),
      })) : [],
    };
  }
}
