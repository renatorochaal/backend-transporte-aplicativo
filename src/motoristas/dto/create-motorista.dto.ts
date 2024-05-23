import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsNumberString } from 'class-validator';

export class CreateMotoristaDto {
    @ApiProperty({ example: 12345678901, description: 'CPF do motorista' })
    @IsNotEmpty({ message: 'CPF do motorista não pode estar vazio' })
    cpf_motorista: bigint;

    @ApiProperty({ example: '123456789012345', description: 'CNH do motorista' })
    @IsString({ message: 'CNH deve ser uma string' })
    @IsNotEmpty({ message: 'CNH não pode estar vazio' })
    cnh: string;

    @ApiProperty({ example: 1, description: 'Código do banco' })
    @IsInt({ message: 'Código do banco deve ser um número inteiro' })
    @IsNotEmpty({ message: 'Código do banco não pode estar vazio' })
    banco_mot: number;

    @ApiProperty({ example: 1234, description: 'Agência do motorista' })
    @IsInt({ message: 'Agência do motorista deve ser um número inteiro' })
    @IsNotEmpty({ message: 'Agência do motorista não pode estar vazia' })
    agencia_mot: number;

    @ApiProperty({ example: 123456, description: 'Conta do motorista' })
    @IsInt({ message: 'Conta do motorista deve ser um número inteiro' })
    @IsNotEmpty({ message: 'Conta do motorista não pode estar vazia' })
    conta_mot: number;
}
