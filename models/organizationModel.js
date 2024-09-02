const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Organ = sequelize.define('Organization', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Organ;
