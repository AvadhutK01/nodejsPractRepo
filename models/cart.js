const { Sequelize } = require("sequelize");
const sequelize = require("../util/database");
const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
})

module.exports = Cart;