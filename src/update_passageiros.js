const axios = require('axios');

const passageiros = [
    { cpf_passag: "12345678901", sexo: "F" },
    { cpf_passag: "23456789012", sexo: "M" },
    { cpf_passag: "34567890123", sexo: "F" },
    { cpf_passag: "45678901234", sexo: "M" },
    { cpf_passag: "56789012345", sexo: "F" },
    { cpf_passag: "67890123456", sexo: "M" },
    { cpf_passag: "78901234567", sexo: "F" },
    { cpf_passag: "89012345678", sexo: "M" },
    { cpf_passag: "90123456789", sexo: "F" },
    { cpf_passag: "11234567890", sexo: "M" },
    { cpf_passag: "22345678901", sexo: "F" },
    { cpf_passag: "33456789012", sexo: "M" },
    { cpf_passag: "44567890123", sexo: "F" },
    { cpf_passag: "55678901234", sexo: "M" },
    { cpf_passag: "66789012345", sexo: "F" },
    { cpf_passag: "77890123456", sexo: "M" },
    { cpf_passag: "88901234567", sexo: "F" },
    { cpf_passag: "99012345678", sexo: "M" },
    { cpf_passag: "10123456789", sexo: "F" }
];

async function updatePassageiro(passageiro) {
    try {
        const response = await axios.patch(`http://localhost:3000/passageiros/${passageiro.cpf_passag}`, {
            sexo: passageiro.sexo
        });
        console.log(`Passageiro ${passageiro.cpf_passag} atualizado com sucesso: `, response.data);
    } catch (error) {
        console.error(`Erro ao atualizar passageiro ${passageiro.cpf_passag}: `, error.response ? error.response.data : error.message);
    }
}

passageiros.forEach(updatePassageiro);
