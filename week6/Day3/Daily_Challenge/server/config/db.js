const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",   // your postgres user
    password: "root", // your password
    database: "user_db" // your database
  }
});

module.exports = db;
