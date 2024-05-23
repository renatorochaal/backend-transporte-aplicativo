import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsOptional, IsDateString } from 'class-validator';

export class CreateViagemDto {
    @ApiProperty({ example: '12345678901', description: 'CPF do passageiro da viagem' })
    @IsNotEmpty({ message: 'CPF do passageiro não pode estar vazio' })
    cpf_pass_viag: bigint;

    @ApiProperty({ example: '12345678901', description: 'CPF do motorista da viagem' })
    @IsNotEmpty({ message: 'CPF do motorista não pode estar vazio' })
    cpf_mot_viag: bigint;

    @ApiProperty({ example: 'ABC1234', description: 'Placa do veículo da viagem' })
    @IsNotEmpty({ message: 'Placa do veículo não pode estar vazia' })
    @IsString({ message: 'Placa do veículo deve ser uma string' })
    placa_veic_viag: string;

    @ApiProperty({ example: 'Rua A, 123', description: 'Local de origem da viagem', required: false })
    @IsOptional()
    @IsString({ message: 'Local de origem deve ser uma string' })
    local_orig_viag?: string;

    @ApiProperty({ example: 'Rua B, 456', description: 'Local de destino da viagem', required: false })
    @IsOptional()
    @IsString({ message: 'Local de destino deve ser uma string' })
    local_dest_viag?: string;

    @ApiProperty({ example: '2023-05-23T15:00:00Z', description: 'Data e hora de início da viagem' })
    @IsNotEmpty({ message: 'Data e hora de início não pode estar vazia' })
    @IsDateString({}, { message: 'Data e hora de início deve ser uma data válida' })
    dt_hora_inicio: string;

    @ApiProperty({ example: '2023-05-23T16:00:00Z', description: 'Data e hora de fim da viagem', required: false })
    @IsOptional()
    @IsDateString({}, { message: 'Data e hora de fim deve ser uma data válida' })
    dt_hora_fim?: string;

    @ApiProperty({ example: 3, description: 'Quantidade de passageiros', required: false })
    @IsOptional()
    @IsInt({ message: 'Quantidade de passageiros deve ser um número inteiro' })
    qtde_pass?: number;

    @ApiProperty({ example: 'DINHEIRO', description: 'Forma de pagamento', required: false })
    @IsOptional()
    @IsString({ message: 'Forma de pagamento deve ser uma string' })
    forma_pagto?: string;

    @ApiProperty({ example: 100.50, description: 'Valor do pagamento', required: false })
    @IsOptional()
    valor_pagto?: number;

    @ApiProperty({ example: 'N', description: 'Cancelamento pelo motorista', required: false })
    @IsOptional()
    @IsString({ message: 'Cancelamento pelo motorista deve ser uma string' })
    cancelam_mot?: string;

    @ApiProperty({ example: 'N', description: 'Cancelamento pelo passageiro', required: false })
    @IsOptional()
    @IsString({ message: 'Cancelamento pelo passageiro deve ser uma string' })
    cancelam_pass?: string;
}
