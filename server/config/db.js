const mysql = require("mysql2");

require("dotenv").config();

const connectionConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// SSL support for cloud MySQL providers
if (process.env.DB_SSL === "true") {
  connectionConfig.ssl = {
    ca: process.env.DB_SSL_CA,
    rejectUnauthorized: true,
  };
}

// MySQL connection pool
const pool = mysql.createPool({
  ...connectionConfig,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test database connection before continuing
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database Connection Failed");
    console.error(err.message);

    // Release any connection if one was created
    if (connection) {
      connection.release();
    }

    process.exit(1);
  }

  console.log("✅ MySQL Connected Successfully");

  connection.release();
});

module.exports = pool;