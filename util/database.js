const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-db', 'root', 'root123', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;