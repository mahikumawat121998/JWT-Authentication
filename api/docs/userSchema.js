const userSwaggerSchema = {
  User: {
    type: "object",
    properties: {
      username: {
        type: "string",
        example: "john_doe",
      },
      email: {
        type: "string",
        format: "email",
        example: "john.doe@example.com",
      },
      password: {
        type: "string",
        format: "password",
        example: "securePassword123",
      },
      isAdmin: {
        type: Boolean,
        format: "Boolean",
        example: true,
      },
    },
  },
};

const userLoginSwaggerSchema = {
  User: {
    type: "object",
    properties: {
      username: {
        type: "string",
        example: "john_doe",
      },

      password: {
        type: "string",
        format: "password",
        example: "securePassword123",
      },
    },
  },
};

module.exports = { userSwaggerSchema ,userLoginSwaggerSchema};
