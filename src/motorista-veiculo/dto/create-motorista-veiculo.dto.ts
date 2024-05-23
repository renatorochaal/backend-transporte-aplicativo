import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMotoristaVeiculoDto {
    @ApiProperty({ example: '12345678901', description: 'CPF do motorista' })
    @IsNotEmpty({ message: 'CPF do motorista não pode estar vazio' })
    cpf_motorista: bigint;

    @ApiProperty({ example: 'ABC1234', description: 'Placa do veículo' })
    @IsString({ message: 'Placa do veículo deve ser uma string' })
    @IsNotEmpty({ message: 'Placa do veículo não pode estar vazia' })
    placa_veiculo: string;
}
