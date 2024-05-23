import { Module } from '@nestjs/common';
import { ProprietariosService } from './proprietarios.service';
import { ProprietariosController } from './proprietarios.controller';

@Module({
  controllers: [ProprietariosController],
  providers: [ProprietariosService],
})
export class ProprietariosModule {}
