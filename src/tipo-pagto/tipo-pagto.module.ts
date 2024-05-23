import { Module } from '@nestjs/common';
import { TipoPagtoService } from './tipo-pagto.service';
import { TipoPagtoController } from './tipo-pagto.controller';

@Module({
  controllers: [TipoPagtoController],
  providers: [TipoPagtoService],
})
export class TipoPagtoModule {}
