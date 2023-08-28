const { Pool } = require("pg");

// Since all of key value pairs are declared in the .env file already, the pg object knows to look for it in the .env file, so no need to declare it below.
// For this reason, thei nfo below is commented out.
const pool = new Pool({
  // user: "postgres",
  // host: "localhost",
  // database: "movies",
  // password: "test",
  // port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
