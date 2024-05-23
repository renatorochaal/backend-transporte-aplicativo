import { Module } from '@nestjs/common';
import { ViagemService } from './viagem.service';
import { ViagemController } from './viagem.controller';

@Module({
  controllers: [ViagemController],
  providers: [ViagemService],
})
export class ViagemModule {}
