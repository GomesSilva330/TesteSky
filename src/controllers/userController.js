const userRepository = require('../repositories/userRepository');

exports.get = async (req, res) => {
    try {
        
        const userId = req.params.id;
        const user = await userRepository.getById(userId);

        const {id,nome,email} = user;
        res.status(200).json({
            id,
            nome,
            email
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