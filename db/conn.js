const { Sequelize } = require('sequelize')
require('dotenv').config()

const conn = new Sequelize(
    process.env.MYSQLDATABASE || 'ecommerce',
    process.env.MYSQLUSER || 'root',
    process.env.MYSQLPASSWORD || 'root',
    {
        host: process.env.MYSQLHOST || 'localhost',
        port: process.env.MYSQLPORT || 3306,
        dialect: 'mysql',
        logging: false
    }
)

module.exports = conn