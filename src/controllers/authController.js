const userRepository = require('../repositories/userRepository');
const crypto = require('../services/cryptoService');
const jwt = require('../services/jwtService');

exports.signUp = async (req, res) => {
    try {
        const { email } = req.body;
        let user = await userRepository.getByEmail(email);

        if(user) return res.status(409).json({ message: 'E-mail já existente!'});

        user = req.body;
        user = await userRepository.create(user);
        user.token = jwt.generateToken({ id: user.id });
        await userRepository.put({ _id: user._id} , { $set: { token: user.token }});

        return res.status(201).json({
            id: user.id,
            nome: user.nome,
            email: user.email,
            data_criacao: user.dataCriado,
            data_atualizacao: user.dataAtualizado,
            ultimo_login: user.ultimoLogin,
            token: user.token,
        });

    } catch (error) {
        return res.status(500).json({
            mensagem: error.message
        });
    }
};

exports.signIn = async (req, res) => {
    try {

        const { email, senha } = req.body;

        const user = await userRepository.getByEmail(email);

        if (!user) return res.status(404).json({ message: 'Usuário e/ou senha inválidos' });

        if (crypto.decrypt(user.senha) !== senha) 
            return res.status(401).json({ message: 'Usuário e/ou senha inválidos' });

        user.token = jwt.generateToken(
            { id: user._id }
        );
        user.ultimoLogin = Date.now();

        await userRepository.put(
            { _id: user._id }, 
            { $set: { token: user.token, ultimoLogin: user.ultimoLogin } }
        );

        return res.status(200).json({
            id: user.id,
            nome: user.nome,
            email: user.email,
            data_criacao: user.dataCriado,
            data_atualizacao: user.dataAtualizado,
            ultimo_login: user.ultimoLogin,
            token: user.token,
        });

    } catch (error) {
        return res.status(500).json({
            mensagem: error.message
        });
    }
};