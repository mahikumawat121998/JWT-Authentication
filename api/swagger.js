const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const {
  userSwaggerSchema,
  userLoginSwaggerSchema,
} = require("./docs/userSchema.js");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "User API Documentation using Swagger",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Local Server",
      },
    ],
    components: {
      schemas: {
        ...userSwaggerSchema,
        ...userLoginSwaggerSchema,
      },
    },
  },
  apis: ["./route/*.js", "./docs/*.js"], // Ensure your route and documentation files are included
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Swagger Docs available at http://localhost:4000/api-docs");
};

module.exports = swaggerDocs;
