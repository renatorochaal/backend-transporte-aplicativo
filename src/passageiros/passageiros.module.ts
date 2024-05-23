import { Module } from '@nestjs/common';
import { PassageirosService } from './passageiros.service';
import { PassageirosController } from './passageiros.controller';

@Module({
  controllers: [PassageirosController],
  providers: [PassageirosService],
})
export class PassageirosModule {}
