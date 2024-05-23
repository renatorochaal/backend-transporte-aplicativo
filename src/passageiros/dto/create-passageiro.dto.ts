import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreatePassageiroDto {
    @ApiProperty({ example: '12345678901', description: 'CPF do passageiro' })
    @IsNotEmpty({ message: 'CPF do passageiro não pode estar vazio' })
    cpf_passag: bigint;

    @ApiProperty({ example: '1234567890123456', description: 'Cartão de crédito do passageiro', required: false })
    @IsString({ message: 'Cartão de crédito deve ser uma string' })
    @IsOptional()
    cartao_cred?: string;

    @ApiProperty({ example: 'VISA', description: 'Bandeira do cartão de crédito', required: false })
    @IsString({ message: 'Bandeira do cartão deve ser uma string' })
    @IsOptional()
    bandeira_cartao?: string;

    @ApiProperty({ example: 'São Paulo', description: 'Cidade de origem', required: false })
    @IsString({ message: 'Cidade de origem deve ser uma string' })
    @IsOptional()
    cidade_orig?: string;
}
