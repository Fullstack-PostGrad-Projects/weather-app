const { Client } = require("pg");



const DB_NAME = "weather-wizard";

const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;



let client = new Client(
    (config = {
      connectionString: DB_URL,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : undefined,
    })
);



module.exports = client;
