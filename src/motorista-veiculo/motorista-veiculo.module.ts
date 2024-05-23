import { Module } from '@nestjs/common';
import { MotoristaVeiculoService } from './motorista-veiculo.service';
import { MotoristaVeiculoController } from './motorista-veiculo.controller';

@Module({
  controllers: [MotoristaVeiculoController],
  providers: [MotoristaVeiculoService],
})
export class MotoristaVeiculoModule {}
