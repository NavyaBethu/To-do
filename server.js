const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const organizationRoutes=require("./routes/organizationRoutes");
const todoRoutes=require("./routes/todoRoutes");
const errorHandler = require('./middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');


const app=express()
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api",organizationRoutes);
app.use('/user', userRoutes);
app.use('/api',todoRoutes);
app.use('/uploads', express.static('uploads'));

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My API',
        version: '1.0.0',
        description: 'A sample API for learning Swagger',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./routes/*.js'], // Ensure this matches the location of your route files
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

//Error handling middleware
app.use(errorHandler);


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
