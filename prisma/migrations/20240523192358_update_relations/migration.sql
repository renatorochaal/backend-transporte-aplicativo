-- AddForeignKey
ALTER TABLE "MotoristaVeiculo" ADD CONSTRAINT "MotoristaVeiculo_cpf_motorista_fkey" FOREIGN KEY ("cpf_motorista") REFERENCES "Motoristas"("cpf_motorista") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotoristaVeiculo" ADD CONSTRAINT "MotoristaVeiculo_placa_veiculo_fkey" FOREIGN KEY ("placa_veiculo") REFERENCES "Veiculo"("placa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_veiculo_proprietarios__fk_fkey" FOREIGN KEY ("veiculo_proprietarios__fk") REFERENCES "Proprietarios"("cpf_prop") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viagem" ADD CONSTRAINT "Viagem_cpf_mot_viag_fkey" FOREIGN KEY ("cpf_mot_viag") REFERENCES "Motoristas"("cpf_motorista") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viagem" ADD CONSTRAINT "Viagem_cpf_pass_viag_fkey" FOREIGN KEY ("cpf_pass_viag") REFERENCES "Passageiros"("cpf_passag") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viagem" ADD CONSTRAINT "Viagem_placa_veic_viag_fkey" FOREIGN KEY ("placa_veic_viag") REFERENCES "Veiculo"("placa") ON DELETE RESTRICT ON UPDATE CASCADE;
