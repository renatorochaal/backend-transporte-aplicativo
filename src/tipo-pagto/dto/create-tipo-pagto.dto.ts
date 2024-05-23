import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateTipoPagtoDto {
    @ApiProperty({ example: 1, description: 'Código do tipo de pagamento' })
    @IsInt({ message: 'Código do tipo de pagamento deve ser um número inteiro' })
    @IsNotEmpty({ message: 'Código do tipo de pagamento não pode estar vazio' })
    cod_pagto: number;

    @ApiProperty({ example: 'Cartão de Crédito', description: 'Descrição do tipo de pagamento' })
    @IsString({ message: 'Descrição do tipo de pagamento deve ser uma string' })
    @IsNotEmpty({ message: 'Descrição do tipo de pagamento não pode estar vazia' })
    desc_pagto: string;
}
