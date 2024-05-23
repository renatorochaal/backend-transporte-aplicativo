import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { MotoristasModule } from './motoristas/motoristas.module';
import { PassageirosModule } from './passageiros/passageiros.module';
import { VeiculoModule } from './veiculo/veiculo.module';
import { ProprietariosModule } from './proprietarios/proprietarios.module';
import { TipoPagtoModule } from './tipo-pagto/tipo-pagto.module';
import { ViagemModule } from './viagem/viagem.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { MotoristaVeiculoModule } from './motorista-veiculo/motorista-veiculo.module';

@Module({
  imports: [PrismaModule, MotoristasModule, PassageirosModule, VeiculoModule, ProprietariosModule, TipoPagtoModule, ViagemModule, PessoasModule, MotoristaVeiculoModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
