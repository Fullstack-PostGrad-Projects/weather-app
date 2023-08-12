const { Client } = require("pg");
// const { DATABASE_URL } = process.env

const DB_NAME = "weather-wizard";

// const DB_URL =
//   process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;

const DB_URL = `postgres://localhost:5432/${DB_NAME}`;

let client;

client = new Client(
  (config = {
    connectionString: DB_URL,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : undefined,
  })
);

// client.query('SELECT * FROM "ksglasper/weathering-with-you"."Historical Apportionment" limit 10;', (err, res) => {
//   console.table(res.rows); // you could also just console.log, but console.table is neat :)
// });

module.exports = client;
