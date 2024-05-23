-- CreateTable
CREATE TABLE "MotoristaVeiculo" (
    "cpf_motorista" BIGINT NOT NULL,
    "placa_veiculo" CHAR(7) NOT NULL,

    CONSTRAINT "MotoristaVeiculo_pkey" PRIMARY KEY ("cpf_motorista","placa_veiculo")
);

-- CreateTable
CREATE TABLE "Motoristas" (
    "cpf_motorista" BIGINT NOT NULL,
    "cnh" VARCHAR(15) NOT NULL,
    "banco_mot" INTEGER NOT NULL,
    "agencia_mot" INTEGER NOT NULL,
    "conta_mot" INTEGER NOT NULL,

    CONSTRAINT "Motoristas_pkey" PRIMARY KEY ("cpf_motorista")
);

-- CreateTable
CREATE TABLE "Passageiros" (
    "cpf_passag" BIGINT NOT NULL,
    "cartao_cred" VARCHAR(20),
    "bandeira_cartao" VARCHAR(20),
    "cidade_orig" VARCHAR(30),

    CONSTRAINT "Passageiros_pkey" PRIMARY KEY ("cpf_passag")
);

-- CreateTable
CREATE TABLE "Pessoas" (
    "cpf_pessoa" BIGINT NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "endereco" VARCHAR(50),
    "telefone" BIGINT,
    "sexo" CHAR(1) NOT NULL,
    "email" VARCHAR(30),

    CONSTRAINT "Pessoas_pkey" PRIMARY KEY ("cpf_pessoa")
);

-- CreateTable
CREATE TABLE "Proprietarios" (
    "cpf_prop" BIGINT NOT NULL,
    "cnh_prop" VARCHAR(15) NOT NULL,
    "banco_prop" INTEGER NOT NULL,
    "agencia_prop" INTEGER NOT NULL,
    "conta_prop" INTEGER NOT NULL,

    CONSTRAINT "Proprietarios_pkey" PRIMARY KEY ("cpf_prop")
);

-- CreateTable
CREATE TABLE "TipoPagto" (
    "cod_pagto" INTEGER NOT NULL,
    "desc_pagto" VARCHAR(20) NOT NULL,

    CONSTRAINT "TipoPagto_pkey" PRIMARY KEY ("cod_pagto")
);

-- CreateTable
CREATE TABLE "Veiculo" (
    "placa" CHAR(7) NOT NULL,
    "marca" VARCHAR(30) NOT NULL,
    "modelo" VARCHAR(30) NOT NULL,
    "ano_fabric" INTEGER NOT NULL,
    "capacidade_pass" INTEGER NOT NULL,
    "cor" VARCHAR(30) NOT NULL,
    "tipo_combust" CHAR(1) NOT NULL,
    "potencia_motor" INTEGER,
    "veiculo_proprietarios__fk" BIGINT NOT NULL,

    CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("placa")
);

-- CreateTable
CREATE TABLE "Viagem" (
    "cpf_pass_viag" BIGINT NOT NULL,
    "cpf_mot_viag" BIGINT NOT NULL,
    "placa_veic_viag" CHAR(7) NOT NULL,
    "local_orig_viag" VARCHAR(30),
    "local_dest_viag" VARCHAR(30),
    "dt_hora_inicio" TIMESTAMP(3) NOT NULL,
    "dt_hora_fim" TIMESTAMP(3),
    "qtde_pass" INTEGER,
    "forma_pagto" VARCHAR(10),
    "valor_pagto" DECIMAL(10,2),
    "cancelam_mot" CHAR(1),
    "cancelam_pass" CHAR(1),

    CONSTRAINT "Viagem_pkey" PRIMARY KEY ("cpf_pass_viag","cpf_mot_viag","placa_veic_viag")
);
