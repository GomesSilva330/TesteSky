const crypto = require('../services/cryptoService');
const {
    security
} = require('../../config');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

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

    const [name,value] = authHeader.split(' ');
    if (!/^Bearer$/.test(name))
        return res.status(401).json({
            message: 'Token mal formatado'
        });

    const token = crypto.decrypt(value, security.CryptoSecretKey);

    jwt.verify(token, security.jwtPrivateKey, async (err, decoded) => {
        if (err) return res.status(401).json({
            message: 'Sessão inválida'
        });
        var user = await userRepository.getById(req.params.id);

        if (!user) return res.status(401).json({
            message: 'Não autorizado'
        });

        if (!(user.token === authHeader))
            return res.status(401).json({
                message: 'Não autorizado'
            });

        req.userId = decoded.params.id;
        return next();
    });
};