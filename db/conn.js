const {Sequelize} = require('sequelize').Sequelize

const db = new Sequelize('db_biblia','root','senai',{
    dialect: 'mysql',
    port: 3306,
    host: 'localhost'
})

module.exports = db