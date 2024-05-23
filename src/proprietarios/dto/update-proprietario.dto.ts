import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProprietarioDto } from './create-proprietario.dto';

export class UpdateProprietarioDto extends PartialType(CreateProprietarioDto) {
    @ApiProperty({ example: '12345678901', description: 'CPF do proprietário' })
    cpf_prop?: bigint;

    @ApiProperty({ example: '123456789012345', description: 'CNH do proprietário' })
    cnh_prop?: string;

    @ApiProperty({ example: 1, description: 'Código do banco' })
    banco_prop?: number;

    @ApiProperty({ example: 1234, description: 'Agência do proprietário' })
    agencia_prop?: number;

    @ApiProperty({ example: 123456, description: 'Conta do proprietário' })
    conta_prop?: number;
}
