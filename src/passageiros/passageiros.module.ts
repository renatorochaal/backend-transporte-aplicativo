import { Module } from '@nestjs/common';
import { PassageirosService } from './passageiros.service';
import { PassageirosController } from './passageiros.controller';
import {PessoasModule} from "../pessoas/pessoas.module";
import {PessoasService} from "../pessoas/pessoas.service";

@Module({
  imports: [PessoasModule],
  controllers: [PassageirosController],
  providers: [PassageirosService, PessoasService],
})
export class PassageirosModule {}
