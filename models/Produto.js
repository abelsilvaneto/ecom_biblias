const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Produto = db.define('Produto', {
    codProduto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    traducao: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    imagemUrl: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    IdCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categorias',
            key: 'codCategoria'
        }
    }
}, {
    tableName: 'produtos',
    timestamps: false
});

module.exports = Produto;