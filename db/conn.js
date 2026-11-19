const { Sequelize } = require('sequelize')

const conn = new Sequelize('db_biblia', 'root', 'senai',
    {
        host: 'localhost',
        port:  3306,
        dialect: 'mysql'
    }
)

module.exports = conn