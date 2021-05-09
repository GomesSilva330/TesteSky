const Usuario = require('../models/user');

exports.getById = async id => {
    return await Usuario.findOne({id});
};

exports.getByEmail = async email => {
    return await Usuario.findOne({email}).select('+senha');
};

exports.create = async user => {
    return await Usuario.create(user);
};

exports.put = async (query = {} , values = {} ) => {
    return await Usuario.updateOne(query, values);
};

exports.get = async () => {
    const data = await Usuario.find({}, 'id nome email');
    return data;
};