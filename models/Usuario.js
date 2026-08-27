const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Usuario = db.define('usuario', {
    codUsuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true
    },
    tipo: {
        type: DataTypes.ENUM('CLIENTE', 'ADMIN'),
        defaultValue: 'CLIENTE',
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'usuarios'
});

module.exports = Usuario;