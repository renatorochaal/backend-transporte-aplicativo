import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePassageiroDto } from './create-passageiro.dto';

export class UpdatePassageiroDto extends PartialType(CreatePassageiroDto) {
    @ApiProperty({ example: '12345678901', description: 'CPF do passageiro' })
    cpf_passag?: bigint;

    @ApiProperty({ example: '1234567890123456', description: 'Cartão de crédito do passageiro', required: false })
    cartao_cred?: string;

    @ApiProperty({ example: 'VISA', description: 'Bandeira do cartão de crédito', required: false })
    bandeira_cartao?: string;

    @ApiProperty({ example: 'São Paulo', description: 'Cidade de origem', required: false })
    cidade_orig?: string;

    @ApiProperty({ example: 'F', description: 'Sexo do passageiro', required: false })
    sexo?: string; // Adicione este campo
}
