import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateViagemDto } from './create-viagem.dto';

export class UpdateViagemDto extends PartialType(CreateViagemDto) {
    @ApiProperty({ example: '12345678901', description: 'CPF do passageiro da viagem' })
    cpf_pass_viag?: bigint;

    @ApiProperty({ example: '12345678901', description: 'CPF do motorista da viagem' })
    cpf_mot_viag?: bigint;

    @ApiProperty({ example: 'ABC1234', description: 'Placa do veículo da viagem' })
    placa_veic_viag?: string;

    @ApiProperty({ example: 'Rua A, 123', description: 'Local de origem da viagem', required: false })
    local_orig_viag?: string;

    @ApiProperty({ example: 'Rua B, 456', description: 'Local de destino da viagem', required: false })
    local_dest_viag?: string;

    @ApiProperty({ example: '2023-05-23T15:00:00Z', description: 'Data e hora de início da viagem' })
    dt_hora_inicio?: string;

    @ApiProperty({ example: '2023-05-23T16:00:00Z', description: 'Data e hora de fim da viagem', required: false })
    dt_hora_fim?: string;

    @ApiProperty({ example: 3, description: 'Quantidade de passageiros', required: false })
    qtde_pass?: number;

    @ApiProperty({ example: 'DINHEIRO', description: 'Forma de pagamento', required: false })
    forma_pagto?: string;

    @ApiProperty({ example: 100.50, description: 'Valor do pagamento', required: false })
    valor_pagto?: number;

    @ApiProperty({ example: 'N', description: 'Cancelamento pelo motorista', required: false })
    cancelam_mot?: string;

    @ApiProperty({ example: 'N', description: 'Cancelamento pelo passageiro', required: false })
    cancelam_pass?: string;
}
