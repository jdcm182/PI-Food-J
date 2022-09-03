const { DataTypes } = require('sequelize')
module.exports = (sequelize) => {
    sequelize.define('diet', {
        id: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
}