import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTipoPagtoDto } from './create-tipo-pagto.dto';

export class UpdateTipoPagtoDto extends PartialType(CreateTipoPagtoDto) {
    @ApiProperty({ example: 1, description: 'Código do tipo de pagamento' })
    cod_pagto?: number;

    @ApiProperty({ example: 'Cartão de Crédito', description: 'Descrição do tipo de pagamento' })
    desc_pagto?: string;
}
