const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1", // or "localhost"
    user: "postgres",  // your postgres username
    password: "root", // your password
    database: "blog_db" // your database name
  }
});

module.exports = db;
