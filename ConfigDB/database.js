const sql = require("mssql");

const config = {
  user: "sqladmin",
  password: "manoj@1234",
  server: "sqldbdemoinmanoj.database.windows.net",
  database: "EmployeeDB",
  port: 1433,
  options: {
    encrypt: true, // Required for Azure
    trustServerCertificate: false, // Keep false for security
  },
};

// Create connection pool
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

poolConnect
  .then(() => {
    console.log("✅ Database connected successfully");
    console.log("✅ Connection pool created successfully");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });

module.exports = { sql, config, pool, poolConnect };
