import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEmail, IsInt, IsIn } from 'class-validator';

export class CreatePessoaDto {
    @ApiProperty({ example: '12345678901', description: 'CPF da pessoa' })
    @IsNotEmpty({ message: 'CPF da pessoa não pode estar vazio' })
    cpf_pessoa: bigint;

    @ApiProperty({ example: 'João Silva', description: 'Nome da pessoa' })
    @IsString({ message: 'Nome da pessoa deve ser uma string' })
    @IsNotEmpty({ message: 'Nome da pessoa não pode estar vazio' })
    nome: string;

    @ApiProperty({ example: 'Rua A, 123', description: 'Endereço da pessoa', required: false })
    @IsOptional()
    @IsString({ message: 'Endereço da pessoa deve ser uma string' })
    endereco?: string;

    @ApiProperty({ example: 5511999999999, description: 'Telefone da pessoa', required: false })
    @IsOptional()
    @IsInt({ message: 'Telefone da pessoa deve ser um número' })
    telefone?: number;

    @ApiProperty({ example: 'M', description: 'Sexo da pessoa', enum: ['M', 'F'] })
    @IsIn(['M', 'F'], { message: 'Sexo da pessoa deve ser "M" ou "F"' })
    @IsNotEmpty({ message: 'Sexo da pessoa não pode estar vazio' })
    sexo: string;

    @ApiProperty({ example: 'joao.silva@example.com', description: 'Email da pessoa', required: false })
    @IsOptional()
    @IsEmail({}, { message: 'Email da pessoa deve ser um email válido' })
    email?: string;
}
