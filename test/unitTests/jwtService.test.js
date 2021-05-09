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
const jwtService = require('../../src/services/jwtService');
const mocks = {
    mockUser: require('./../mocks/user.json'),
    mockConfig: require('./../mocks/config.json')
};

describe('JwtService Suite Tests', () => {
    let sandbox = {};

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });
    afterEach(() => {
        sandbox.restore();
    });

    it('given a id should return a encrypted token', () => {
        const user = Object.create(mocks.mockUser);
        const result = jwtService.generateToken({ id: user.id }, mocks.mockConfig.security);

        expect(result.length).to.be.gte(0);
    });
});