const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const organization = require('./organizationModel');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{type:DataTypes.STRING,allowNull:false,unique: true,},
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('Admin', 'Member'),
    allowNull: false,
  },
  organizationId: {
    type: DataTypes.INTEGER,
    references: {
      model: organization,
      key: 'id',
    },
  },
});
User.belongsTo(organization, { foreignKey: 'organizationId' });
organization.hasMany(User, { foreignKey: 'organizationId' });


module.exports = User;
