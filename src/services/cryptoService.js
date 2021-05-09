const crypto = require('crypto');
const config = require('../../config');

exports.encrypt = senha => {
    var cipher = crypto.createCipher('aes-256-cbc', config.security.CryptoSecretKey);
    var crypted = cipher.update(senha, 'utf-8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
};

exports.decrypt = senha => {
    var decipher = crypto.createDecipher('aes-256-cbc', config.security.CryptoSecretKey);
    var decrypted = decipher.update(senha, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
};