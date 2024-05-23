import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

@Injectable()
export class PessoasService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPessoaDto: CreatePessoaDto) {
    const existingPessoa = await this.prisma.pessoas.findUnique({
      where: { cpf_pessoa: BigInt(createPessoaDto.cpf_pessoa) },
    });

    if (existingPessoa) {
      throw new ConflictException('Pessoa com este CPF já existe');
    }

    const pessoa = await this.prisma.pessoas.create({
      data: {
        ...createPessoaDto,
        cpf_pessoa: BigInt(createPessoaDto.cpf_pessoa),
      },
    });

    return this.toPessoaDto(pessoa);
  }

  async findAll() {
    const pessoas = await this.prisma.pessoas.findMany();
    return pessoas.map(this.toPessoaDto);
  }

  async findOne(cpf_pessoa: string) {
    const pessoa = await this.prisma.pessoas.findUnique({
      where: { cpf_pessoa: BigInt(cpf_pessoa) },
    });

    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }

    return this.toPessoaDto(pessoa);
  }

  async update(cpf_pessoa: string, updatePessoaDto: UpdatePessoaDto) {
    await this.findOne(cpf_pessoa);
    const pessoa = await this.prisma.pessoas.update({
      where: { cpf_pessoa: BigInt(cpf_pessoa) },
      data: {
        ...updatePessoaDto,
        cpf_pessoa: updatePessoaDto.cpf_pessoa ? BigInt(updatePessoaDto.cpf_pessoa) : undefined,
      },
    });
    return this.toPessoaDto(pessoa);
  }

  async remove(cpf_pessoa: string) {
    await this.findOne(cpf_pessoa);
    const pessoa = await this.prisma.pessoas.delete({
      where: { cpf_pessoa: BigInt(cpf_pessoa) },
    });
    return this.toPessoaDto(pessoa);
  }

  private toPessoaDto(pessoa: any) {
    return {
      ...pessoa,
      cpf_pessoa: pessoa.cpf_pessoa.toString(),
      telefone: pessoa.telefone ? pessoa.telefone.toString() : undefined,
    };
  }
}
