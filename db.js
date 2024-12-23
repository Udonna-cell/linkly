require("dotenv").config()

const mysql = require("mysql");

// Create a MySQL connection pool
const connection = mysql.createConnection({
  host: process.env.HOST || 'localhost',
  user: process.env.USER || 'admin', 
  password: process.env.PASSWORD || '',
  database: process.env.DB || 'linkly'
});


module.exports = { connection };
