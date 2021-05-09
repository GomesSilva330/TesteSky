const crypto = require('../services/cryptoService');
const { security } = require('../../config');
const jwt = require('jsonwebtoken');

exports.generateToken = (params = {}) => {
    const token = jwt.sign({
        params
    }, security.jwtPrivateKey, {
        expiresIn: security.jwtExpirationTime
    });

    return crypto.encrypt(token);
};

exports.verify = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({
            message: 'Não autorizado'
        });

    const token = crypto.decrypt(authHeader);

    jwt.verify(token, security.jwtPrivateKey, (err, decoded) => {
        if (err) return res.status(401).json({
            message: 'Sessão inválida'
        });

        req.userId = decoded.id;
        return next();
    });
};