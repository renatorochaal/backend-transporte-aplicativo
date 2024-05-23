import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateVeiculoDto {
    @ApiProperty({ example: 'ABC1234', description: 'Placa do veículo' })
    @IsNotEmpty({ message: 'Placa do veículo não pode estar vazia' })
    @IsString({ message: 'Placa do veículo deve ser uma string' })
    placa: string;

    @ApiProperty({ example: 'Toyota', description: 'Marca do veículo' })
    @IsNotEmpty({ message: 'Marca do veículo não pode estar vazia' })
    @IsString({ message: 'Marca do veículo deve ser uma string' })
    marca: string;

    @ApiProperty({ example: 'Corolla', description: 'Modelo do veículo' })
    @IsNotEmpty({ message: 'Modelo do veículo não pode estar vazio' })
    @IsString({ message: 'Modelo do veículo deve ser uma string' })
    modelo: string;

    @ApiProperty({ example: 2021, description: 'Ano de fabricação do veículo' })
    @IsInt({ message: 'Ano de fabricação deve ser um número inteiro' })
    @IsNotEmpty({ message: 'Ano de fabricação não pode estar vazio' })
    ano_fabric: number;

    @ApiProperty({ example: 5, description: 'Capacidade de passageiros' })
    @IsInt({ message: 'Capacidade de passageiros deve ser um número inteiro' })
    @IsNotEmpty({ message: 'Capacidade de passageiros não pode estar vazia' })
    capacidade_pass: number;

    @ApiProperty({ example: 'Preto', description: 'Cor do veículo' })
    @IsNotEmpty({ message: 'Cor do veículo não pode estar vazia' })
    @IsString({ message: 'Cor do veículo deve ser uma string' })
    cor: string;

    @ApiProperty({ example: 'G', description: 'Tipo de combustível (G - Gasolina, A - Álcool, D - Diesel, F - Flex)' })
    @IsNotEmpty({ message: 'Tipo de combustível não pode estar vazio' })
    @IsString({ message: 'Tipo de combustível deve ser uma string' })
    tipo_combust: string;

    @ApiProperty({ example: 140, description: 'Potência do motor', required: false })
    @IsOptional()
    @IsInt({ message: 'Potência do motor deve ser um número inteiro' })
    potencia_motor?: number;

    @ApiProperty({ example: 12345678901, description: 'CPF do proprietário do veículo', required: false })
    @IsOptional()
    veiculo_proprietarios__fk?: bigint;
}
