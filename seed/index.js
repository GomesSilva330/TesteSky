const faker = require('faker');
const {
    join
} = require('path');
const {
    writeFile
} = require('fs').promises;

const seederBaseFolder = join(__dirname, '../', 'database');
const ITEMS_AMOUT = 2;

const User = {
    id: faker.random.uuid(),
    nome: faker.name.findName(),
    email: faker.internet.email(),
    senha: faker.random.uuid().substring(0,5),
    telefones: [{
        telefone: faker.phone.phoneNumber(),
        ddd: 11
    }],
    dataCriado: Date.now,
    dataAtualizado: Date.now,
    ultimoLogin: Date.now,
    token: '',
};

const users = [];
for (let i = 0; i <= ITEMS_AMOUT; i++) {
    const user = {
        id: faker.random.uuid(),
        nome: faker.name.findName(),
        email: faker.internet.email(),
        senha: faker.random.uuid().substring(0,5),
        telefones: [{
            telefone: faker.phone.phoneNumber(),
            ddd: 11
        }],
        dataCriado: Date.now,
        dataAtualizado: Date.now,
        ultimoLogin: Date.now,
        token: '',
    };
    users.push(user);
}

const write = (fileName, data) => writeFile(join(seederBaseFolder, fileName), JSON.stringify(data))

;
(async () => {
    await write('users.json', users);
    await write('user.json', User);

    console.log('users.json', users);
    console.log('user.json', User);
})();