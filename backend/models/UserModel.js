const mysql = require('mysql');
const bcrypt = require('bcrypt');

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'attendance_db'
});

// Helper function to query the database with promises
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

// Register a new user
const registerUser = async (email, usn, password) => {
  const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds
  const sql = 'INSERT INTO users (email, usn, password) VALUES (?, ?, ?)';
  const values = [email, usn, hashedPassword];
  const result = await query(sql, values);
  // Return the inserted user id and email, usn (excluding password)
  return { id: result.insertId, email, usn };
};

// Login user
const loginUser = async (email, password) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const values = [email];
  const results = await query(sql, values);
  const user = results[0];
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  // Exclude password from returned user object
  const { password: pwd, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

module.exports = {
  registerUser,
  loginUser
};
