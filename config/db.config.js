require("dotenv").config();

module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD || "password",
  DB: process.env.DB_NAME || "book_mgmt",
  DIALECT: "mysql",
};
