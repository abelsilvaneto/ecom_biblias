const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Entrega = db.define('entrega', {
    codEntrega: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdPedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pedidos',
            key: 'codPedido'
        }
    },
cep: {
    type: DataTypes.STRING(9),
    allowNull: false
  },
rua: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
numero: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  complemento: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  bairro: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cidade: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING(2),
    allowNull: false
  },
  statusEntrega: {
    type: DataTypes.ENUM('EM_PREPARACAO', 'EM_TRANSITO', 'ENTREGUE'),
    defaultValue: 'EM_PREPARACAO',
    allowNull: false
  }
}, {
    tableName: 'entregas',
    timestamps: false
});

module.exports = Entrega;