// users.js (or any other file where you need to interact with the database)
const db = require('../db');

// Example function to get users from the database
async function getUsers() {
  try {
    const users = await db.query('SELECT * FROM linkly');
    return users;
  } catch (err) {
    console.error('Error fetching users:', err);
  }
}

// Example function to insert a user into the database
async function addUser(name, email) {
  try {
    const result = await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    return result;
  } catch (err) {
    console.error('Error inserting user:', err);
  }
}

// async function getLinks() {
//     try {
//       const [rows, fields] = await promisePool.query('SELECT * FROM linkly');
//       console.log(rows); // Log the result from the query
//       return rows;
//     } catch (err) {
//       console.error('Database query error:', err);
//     }
//   }

module.exports = { getUsers, addUser };
