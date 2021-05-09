const userRepository = require('../repositories/userRepository');
const crypto = require('../services/cryptoService');
const jwt = require('../services/jwtService');
const { v4: uuidv4 } = require('uuid');

exports.signUp = async (req, res) => {
    try {
        const { email : userEmail } = req.body;
        let user = await userRepository.getByEmail(userEmail);

        if(user) return res.status(409).json({ message: 'E-mail já existente!'});

        user = req.body;
        user.id = uuidv4();
        user = await userRepository.create(user);
        user.token = 'Bearer ' + jwt.generateToken({ id: user.id });
        await userRepository.put({ _id: user._id} , { $set: { token: user.token }});

        const {id,nome,email,dataCriado,dataAtualizado,ultimoLogin,token} = user;
        return res.status(201).json({
            id,
            nome,
            email,
            dataCriado,
            dataAtualizado,
            ultimoLogin,
            token,
        });

    } catch (error) {
        return res.status(500).json({
            mensagem: error.message
        });
    }
};

exports.signIn = async (req, res) => {
    try {

        const { email : userEmail, senha : userSenha} = req.body;

        const user = await userRepository.getByEmail(userEmail);

        if (!user) return res.status(404).json({ message: 'Usuário e/ou senha inválidos' });

        if (crypto.decrypt(user.senha) !== userSenha) 
            return res.status(401).json({ message: 'Usuário e/ou senha inválidos' });

        user.token = 'Bearer ' + jwt.generateToken(
            { id: user.id }
        );
        user.ultimoLogin = Date.now();

        await userRepository.put(
            { _id: user._id }, 
            { $set: { token: user.token, ultimoLogin: user.ultimoLogin } }
        );

        const {id,nome,email,dataCriado,dataAtualizado,ultimoLogin,token} = user;
        return res.status(200).json({
            id,
            nome,
            email,
            dataCriado,
            dataAtualizado,
            ultimoLogin,
            token,
        });

    } catch (error) {
        return res.status(500).json({
            mensagem: error.message
        });
    }
};