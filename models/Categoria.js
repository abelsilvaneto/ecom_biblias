const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Categoria = db.define('categoria', {
    codCategoria: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'categorias',
    timestamps: false
});

module.exports = Categoria;