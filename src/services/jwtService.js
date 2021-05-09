const crypto = require('../services/cryptoService');
const {security} = require('../../config');
const jwt = require('jsonwebtoken');

exports.generateToken = (params = {}, chaves = security) => {
    try {
        const token = jwt.sign({
            params
        }, chaves.jwtPrivateKey, {
            expiresIn: chaves.jwtExpirationTime
        });

        return crypto.encrypt(token, chaves.CryptoSecretKey);
    } catch (error) {
        console.log(error.message);
        return null;
    }
};

exports.verify = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({
            message: 'Não autorizado'
        });

    const token = crypto.decrypt(authHeader, security.CryptoSecretKey);

    jwt.verify(token, security.jwtPrivateKey, (err, decoded) => {
        if (err) return res.status(401).json({
            message: 'Sessão inválida'
        });

        req.userId = decoded.id;
        return next();
    });
};