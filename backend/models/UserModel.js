require("dotenv").config();
const { neon } = require("@neondatabase/serverless");
const bcrypt = require('bcrypt');

const sql = neon(process.env.DATABASE_URL);

// Helper function to query the database with promises
const query = async (queryString, values) => {
  try {
    const result = await sql.unsafe(queryString, values);
    return result;
  } catch (error) {
    throw error;
  }
};

// Register a new user with role and profile completion status
const registerUser = async (email, usn, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds
  const queryString = 'INSERT INTO users (email, usn, password, role, profile_completed) VALUES ($1, $2, $3, $4, $5) RETURNING id';
  const values = [email, usn, hashedPassword, role, false];
  const result = await query(queryString, values);
  // Return the inserted user id, email, usn, role, and profile_completed (excluding password)
  return { id: result[0].id, email, usn, role, profile_completed: false };
};

// Login user
const loginUser = async (email, password) => {
  const queryString = 'SELECT * FROM users WHERE email = $1';
  const values = [email];
  const results = await query(queryString, values);
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
