import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMotoristaVeiculoDto } from './create-motorista-veiculo.dto';

export class UpdateMotoristaVeiculoDto extends PartialType(CreateMotoristaVeiculoDto) {
    @ApiProperty({ example: '12345678901', description: 'CPF do motorista', required: false })
    cpf_motorista?: bigint;

    @ApiProperty({ example: 'ABC1234', description: 'Placa do veículo', required: false })
    placa_veiculo?: string;
}
