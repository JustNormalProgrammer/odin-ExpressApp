const { Pool } = require("pg");
const path = require('node:path');
require('dotenv').config({ path: path.join(__dirname, '../.env')});


module.exports = new Pool({
  host: "localhost",
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.koyebdb,
  port: 5432,
});