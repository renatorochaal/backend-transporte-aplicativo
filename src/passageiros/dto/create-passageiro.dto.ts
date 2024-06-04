import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { CreatePessoaDto } from '../../pessoas/dto/create-pessoa.dto';


export class CreatePassageiroDto extends CreatePessoaDto {
    @ApiProperty({ example: '1234567890123456', description: 'Cartão de crédito do passageiro', required: false })
    @IsString({ message: 'Cartão de crédito deve ser uma string' })
    @IsOptional()
    cartao_cred?: string;

    @ApiProperty({ example: 'VISA', description: 'Bandeira do cartão de crédito', required: false })
    @IsString({ message: 'Bandeira do cartão deve ser uma string' })
    @IsOptional()
    bandeira_cartao?: string;

    @ApiProperty({ example: 'São Paulo', description: 'Cidade de origem', required: false })
    @IsString({ message: 'Cidade de origem deve ser uma string' })
    @IsOptional()
    cidade_orig?: string;
}
