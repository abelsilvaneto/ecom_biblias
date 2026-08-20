const {DataTypes} = require('sequelize')
const db = require('../db')

const Usuario = db.define('usuario', {
    idUsuario:{
    type: DataTypes.INTEGER,
    autoincrement: true,
    
    }
})