import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePassageiroDto } from './dto/create-passageiro.dto';
import { UpdatePassageiroDto } from './dto/update-passageiro.dto';

@Injectable()
export class PassageirosService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPassageiroDto: CreatePassageiroDto) {
    const existingPassageiro = await this.prisma.passageiros.findUnique({
      where: { cpf_passag: BigInt(createPassageiroDto.cpf_passag) },
    });

    if (existingPassageiro) {
      throw new ConflictException('Passageiro com este CPF já existe');
    }

    const passageiro = await this.prisma.passageiros.create({
      data: {
        ...createPassageiroDto,
        cpf_passag: BigInt(createPassageiroDto.cpf_passag),
      },
      include: {
        viagens: true,
      },
    });

    return this.toPassageiroDto(passageiro);
  }

  async findAll() {
    const passageiros = await this.prisma.passageiros.findMany({
      include: {
        viagens: true,
      },
    });
    return passageiros.map(this.toPassageiroDto);
  }

  async findOne(cpf_passag: string) {
    const passageiro = await this.prisma.passageiros.findUnique({
      where: { cpf_passag: BigInt(cpf_passag) },
      include: {
        viagens: true,
      },
    });

    if (!passageiro) {
      throw new NotFoundException('Passageiro não encontrado');
    }

    return this.toPassageiroDto(passageiro);
  }

  async update(cpf_passag: string, updatePassageiroDto: UpdatePassageiroDto) {
    await this.findOne(cpf_passag);
    const passageiro = await this.prisma.passageiros.update({
      where: { cpf_passag: BigInt(cpf_passag) },
      data: {
        ...updatePassageiroDto,
        cpf_passag: updatePassageiroDto.cpf_passag ? BigInt(updatePassageiroDto.cpf_passag) : undefined,
      },
      include: {
        viagens: true,
      },
    });
    return this.toPassageiroDto(passageiro);
  }


  async remove(cpf_passag: string) {
    await this.findOne(cpf_passag);
    const passageiro = await this.prisma.passageiros.delete({
      where: { cpf_passag: BigInt(cpf_passag) },
      include: {
        viagens: true,
      },
    });
    return this.toPassageiroDto(passageiro);
  }

  private toPassageiroDto(passageiro: any) {
    return {
      ...passageiro,
      cpf_passag: passageiro.cpf_passag.toString(),
      viagens: passageiro.viagens ? passageiro.viagens.map((viagem: any) => ({
        ...viagem,
        cpf_mot_viag: viagem.cpf_mot_viag.toString(),
        cpf_pass_viag: viagem.cpf_pass_viag.toString(),
      })) : [],
    };
  }

  
  async updateSexoPassageiros() {
    console.log('Atualizando sexo dos passageiros');
  
    // Buscar todos os passageiros
    const passageiros = await this.prisma.passageiros.findMany();
  
    console.log('Passageiros encontrados:', passageiros.length);
  
    const total = passageiros.length;
    const metade = Math.floor(total / 2);
  
    console.log('Total de passageiros:', total);
    console.log('Metade:', metade);
  
    // Atualizar o sexo dos passageiros
    for (let i = 0; i < total; i++) {
      const sexo = i < metade ? 'F' : 'M';
      await this.prisma.passageiros.update({
        where: { cpf_passag: passageiros[i].cpf_passag },
        data: {
          sexo: sexo,
        },
      });
    }
    
    return { message: 'Passageiros atualizados com sucesso' };
  }
  
  
  
  
  
  
}
