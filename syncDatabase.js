const sequelize = require('./config/database');
const organization=require("./models/organizationModel");
const user = require('./models/userModel');
const todo=require("./models/todoModel");



async function syncDatabase() {
  try {
    await sequelize.sync({alter:true}); 
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

syncDatabase();
