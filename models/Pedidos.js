const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');

const Pedido = sequelize.define('Pedido', {
    codPedido: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'idUsuario'
        }
    },
    dataPedido: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    valorTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('PENDENTE', 'PAGO', 'CANCELADO'),
        defaultValue: 'PENDENTE',
        allowNull: false
    }
}, {
    tableName: 'pedidos',
    timestamps: false
});

module.exports = Pedido;