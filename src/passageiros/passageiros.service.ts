import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePassageiroDto } from './dto/create-passageiro.dto';
import { UpdatePassageiroDto } from './dto/update-passageiro.dto';
import { PessoasService } from '../pessoas/pessoas.service'; // Importe o PessoasService
import { CreatePessoaDto } from '../pessoas/dto/create-pessoa.dto'; // Importe o CreatePessoaDto

@Injectable()
export class PassageirosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pessoasService: PessoasService, // Injete o PessoasService
  ) { }

  async create(createPassageiroDto: CreatePassageiroDto) {
    const existingPassageiro = await this.prisma.passageiros.findUnique({
      where: { cpf_passag: BigInt(createPassageiroDto.cpf_pessoa) },
    });

    if (existingPassageiro) {
      throw new ConflictException('Passageiro com este CPF já existe');
    }

    // Create the Pessoa
    const createPessoaDto = new CreatePessoaDto();
    createPessoaDto.cpf_pessoa = createPassageiroDto.cpf_pessoa;
    // Copy other necessary attributes from createPassageiroDto to createPessoaDto
    const pessoa = await this.pessoasService.create(createPessoaDto);

    // Create the Passageiro
    const passageiro = await this.prisma.passageiros.create({
      data: {
        ...createPassageiroDto,
        cpf_passag: BigInt(createPassageiroDto.cpf_pessoa), // Use the same CPF for cpf_passag
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
}
