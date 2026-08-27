const { DataTypes } = require('sequelize');
const db = require('../db/conn');


const Estoque = db.define('estoque', {
    codEstoque: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'produtos',
            key: 'codProduto'
        }
    },
    quantidadeDisponivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'estoques',
    timestamps: false
});

module.exports = Estoque;