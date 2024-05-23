import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProprietarioDto } from './dto/create-proprietario.dto';
import { UpdateProprietarioDto } from './dto/update-proprietario.dto';

@Injectable()
export class ProprietariosService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createProprietarioDto: CreateProprietarioDto) {
    const existingProprietario = await this.prisma.proprietarios.findUnique({
      where: { cpf_prop: BigInt(createProprietarioDto.cpf_prop) },
    });

    if (existingProprietario) {
      throw new ConflictException('Proprietário com este CPF já existe');
    }

    const proprietario = await this.prisma.proprietarios.create({
      data: {
        ...createProprietarioDto,
        cpf_prop: BigInt(createProprietarioDto.cpf_prop),
      },
      include: {
        veiculos: true,
      },
    });

    return this.toProprietarioDto(proprietario);
  }

  async findAll() {
    const proprietarios = await this.prisma.proprietarios.findMany({
      include: {
        veiculos: true,
      },
    });
    return proprietarios.map(this.toProprietarioDto);
  }

  async findOne(cpf_prop: string) {
    const proprietario = await this.prisma.proprietarios.findUnique({
      where: { cpf_prop: BigInt(cpf_prop) },
      include: {
        veiculos: true,
      },
    });

    if (!proprietario) {
      throw new NotFoundException('Proprietário não encontrado');
    }

    return this.toProprietarioDto(proprietario);
  }

  async update(cpf_prop: string, updateProprietarioDto: UpdateProprietarioDto) {
    await this.findOne(cpf_prop);
    const proprietario = await this.prisma.proprietarios.update({
      where: { cpf_prop: BigInt(cpf_prop) },
      data: {
        ...updateProprietarioDto,
        cpf_prop: updateProprietarioDto.cpf_prop ? BigInt(updateProprietarioDto.cpf_prop) : undefined,
      },
      include: {
        veiculos: true,
      },
    });
    return this.toProprietarioDto(proprietario);
  }

  async remove(cpf_prop: string) {
    await this.findOne(cpf_prop);
    const proprietario = await this.prisma.proprietarios.delete({
      where: { cpf_prop: BigInt(cpf_prop) },
      include: {
        veiculos: true,
      },
    });
    return this.toProprietarioDto(proprietario);
  }

  private toProprietarioDto(proprietario: any) {
    return {
      ...proprietario,
      cpf_prop: proprietario.cpf_prop.toString(),
      veiculos: proprietario.veiculos ? proprietario.veiculos.map((veiculo: any) => ({
        ...veiculo,
        veiculo_proprietarios__fk: veiculo.veiculo_proprietarios__fk.toString(),
      })) : [],
    };
  }
}
