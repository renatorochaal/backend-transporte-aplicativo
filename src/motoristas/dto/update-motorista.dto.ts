import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMotoristaDto } from './create-motorista.dto';

export class UpdateMotoristaDto extends PartialType(CreateMotoristaDto) {
    @ApiProperty({ example: '12345678901', description: 'CPF do motorista' })
    cpf_motorista?: bigint;

    @ApiProperty({ example: '123456789012345', description: 'CNH do motorista' })
    cnh?: string;

    @ApiProperty({ example: 1, description: 'Código do banco' })
    banco_mot?: number;

    @ApiProperty({ example: 1234, description: 'Agência do motorista' })
    agencia_mot?: number;

    @ApiProperty({ example: 123456, description: 'Conta do motorista' })
    conta_mot?: number;
}
