const crypto = require('crypto');
const {security} = require('../../config');

exports.encrypt = (senha, chave = security.CryptoSecretKey) => {
    var cipher = crypto.createCipher('aes-256-cbc', chave);
    var crypted = cipher.update(senha, 'utf-8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
};

exports.decrypt = (senha, chave = security.CryptoSecretKey) => {
    var decipher = crypto.createDecipher('aes-256-cbc', chave);
    var decrypted = decipher.update(senha, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
};