import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateVeiculoDto } from './create-veiculo.dto';

export class UpdateVeiculoDto extends PartialType(CreateVeiculoDto) {
    @ApiProperty({ example: 'ABC1234', description: 'Placa do veículo' })
    placa?: string;

    @ApiProperty({ example: 'Toyota', description: 'Marca do veículo' })
    marca?: string;

    @ApiProperty({ example: 'Corolla', description: 'Modelo do veículo' })
    modelo?: string;

    @ApiProperty({ example: 2021, description: 'Ano de fabricação do veículo' })
    ano_fabric?: number;

    @ApiProperty({ example: 5, description: 'Capacidade de passageiros' })
    capacidade_pass?: number;

    @ApiProperty({ example: 'Preto', description: 'Cor do veículo' })
    cor?: string;

    @ApiProperty({ example: 'G', description: 'Tipo de combustível (G - Gasolina, A - Álcool, D - Diesel, F - Flex)' })
    tipo_combust?: string;

    @ApiProperty({ example: 140, description: 'Potência do motor', required: false })
    potencia_motor?: number;

    @ApiProperty({ example: 12345678901, description: 'CPF do proprietário do veículo', required: false })
    veiculo_proprietarios__fk?: bigint;
}
