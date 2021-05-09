const userRepository = require('../repositories/userRepository');

exports.get = async (req, res) => {
    try {
        
        const id = req.params.id;
        const user = await userRepository.getById(id);

        res.status(200).json({
            Id: user.id,
            nome: user.nome,
            email: user.email
        });

    } catch (error) {
        return res.status(500).json({
            mensagem: error.message
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        
        const data = await userRepository.get();
        res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({
            mensagem: error.message
        });
    }
};