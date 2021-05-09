const mongoose = require('../database/index');
const crypto = require('../services/cryptoService');
const { v4: uuidv4 } = require('uuid');

const UsuarioSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true,
        default: uuidv4(),
    },
    token: {
        type: String,
        require: false,
    },
    nome: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    senha: {
        type: String,
        require: true,
        select: false,
    },
    telefones: [{
        numero: {
            type: String,
        },
        ddd: {
            type: Number,
        }
    }],
    dataCriado: {
        type: Date,
        default: Date.now,
    },
    dataAtualizado: {
        type: Date,
        default: Date.now,
    },
    ultimoLogin: {
        type: Date,
        default: Date.now,
    }
});

UsuarioSchema.pre('save', async function (next) {
    this.senha = await crypto.encrypt(this.senha);
    next();
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;