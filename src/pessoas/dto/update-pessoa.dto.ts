import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePessoaDto } from './create-pessoa.dto';

export class UpdatePessoaDto extends PartialType(CreatePessoaDto) {
    @ApiProperty({ example: '12345678901', description: 'CPF da pessoa' })
    cpf_pessoa?: bigint;

    @ApiProperty({ example: 'João Silva', description: 'Nome da pessoa' })
    nome?: string;

    @ApiProperty({ example: 'Rua A, 123', description: 'Endereço da pessoa', required: false })
    endereco?: string;

    @ApiProperty({ example: 5511999999999, description: 'Telefone da pessoa', required: false })
    telefone?: number;

    @ApiProperty({ example: 'M', description: 'Sexo da pessoa', enum: ['M', 'F'], required: false })
    sexo?: string;

    @ApiProperty({ example: 'joao.silva@example.com', description: 'Email da pessoa', required: false })
    email?: string;
}
