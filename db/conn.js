const { Sequelize } = require('sequelize')
require('dotenv').config()

const conn = new Sequelize(
    process.env.MYSQLDATABASE || 'db_biblia',
    process.env.MYSQLUSER || 'root',
    process.env.MYSQLPASSWORD || 'senai',
    {
        host: process.env.MYSQLHOST || 'localhost',
        port: process.env.MYSQLPORT || 3306,
        dialect: 'mysql',
        logging: false
    }
)

module.exports = conn