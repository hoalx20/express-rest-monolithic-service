const { Sequelize } = require('sequelize');

module.exports = { sequelize: new Sequelize(process.env.SEQUELIZE_DNS) };
