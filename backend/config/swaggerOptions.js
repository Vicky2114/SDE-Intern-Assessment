const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Car Management API Documentation',
      version: '1.0.0',
      description: 'API documentation for Car Management Application where users can create, view, edit, and delete cars',
    },
    servers: [
      {
        url: 'http://localhost:8080/api',
        description: 'Development server',
      },
      {
        url: 'https://productcar-g0hshwf2eufwfwaz.canadacentral-01.azurewebsites.net/api',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],  // Use the bearer authentication defined in components
    },
  ],
  apis: ['./routes/*.js'], // Path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
