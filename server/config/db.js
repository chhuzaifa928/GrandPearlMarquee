const mysql = require("mysql2");
const fs = require("fs");

require("dotenv").config();

const connectionConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Aiven requires SSL in production.
// Local development continues without SSL.
if (process.env.DB_SSL === "true") {
  connectionConfig.ssl = {
    ca: process.env.DB_SSL_CA,
    rejectUnauthorized: true,
  };
}

const connection = mysql.createConnection(connectionConfig);

connection.connect((err) => {
  if (err) {
    console.error("❌ Database Connection Failed");
    console.error(err.message);
    return;
  }

  console.log("✅ MySQL Connected Successfully");
});

module.exports = connection;