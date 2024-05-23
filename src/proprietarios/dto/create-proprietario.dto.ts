import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateProprietarioDto {
    @ApiProperty({ example: '12345678901', description: 'CPF do proprietário' })
    @IsNotEmpty({ message: 'CPF do proprietário não pode estar vazio' })
    cpf_prop: bigint;

    @ApiProperty({ example: '123456789012345', description: 'CNH do proprietário' })
    @IsString({ message: 'CNH deve ser uma string' })
    @IsNotEmpty({ message: 'CNH não pode estar vazio' })
    cnh_prop: string;

    @ApiProperty({ example: 1, description: 'Código do banco' })
    @IsInt({ message: 'Código do banco deve ser um número inteiro' })
    @IsNotEmpty({ message: 'Código do banco não pode estar vazio' })
    banco_prop: number;

    @ApiProperty({ example: 1234, description: 'Agência do proprietário' })
    @IsInt({ message: 'Agência do proprietário deve ser um número inteiro' })
    @IsNotEmpty({ message: 'Agência do proprietário não pode estar vazia' })
    agencia_prop: number;

    @ApiProperty({ example: 123456, description: 'Conta do proprietário' })
    @IsInt({ message: 'Conta do proprietário deve ser um número inteiro' })
    @IsNotEmpty({ message: 'Conta do proprietário não pode estar vazia' })
    conta_prop: number;
}
