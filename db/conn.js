const {Sequelize} = require('sequelize')

const db = new Sequelize('db_Biblia','root','senai',{
    dialect: 'mysql',
    port: 3306,
    host: 'localhost'
})

module.exports = db