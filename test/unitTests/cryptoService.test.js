const {
    describe,
    it,
    beforeEach,
    afterEach
} = require('mocha');
const {
    expect
} = require('chai');
const sinon = require('sinon');
const cryptoService = require('../../src/services/cryptoService');
const mocks = {
    mockUser: require('./../mocks/user.json'),
    mockUserEncrypted: require('./../mocks/userEncrypted.json'),
    mockConfig: require('./../mocks/config.json')
};

describe('CryptoService Suite Tests', () => {
    let sandbox = {};

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });
    afterEach(() => {
        sandbox.restore();
    });

    it('given a string should return a encrypted string', () => {
        const user = Object.create(mocks.mockUser);
        const userEncrypted = Object.create(mocks.mockUserEncrypted);
        const result = cryptoService.encrypt(user.senha, mocks.mockConfig.security.CryptoSecretKey);

        expect(result).to.be.deep.equal(userEncrypted.senha);
    });

    it('given a string should return a dencrypted string', () => {
        const user = Object.create(mocks.mockUser);
        const userEncrypted = Object.create(mocks.mockUserEncrypted);
        const result = cryptoService.decrypt(userEncrypted.senha, mocks.mockConfig.security.CryptoSecretKey);

        expect(result).to.be.deep.equal(user.senha);
    });
});