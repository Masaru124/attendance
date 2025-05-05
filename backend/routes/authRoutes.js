const express = require('express');
const { loginUser, registerUser } = require('../models/UserModel');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, usn, password, role } = req.body;
  try {
    const user = await registerUser(email, usn, password, role);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    if (user) {
      res.status(200).json(user); // Exclude password in response
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;
