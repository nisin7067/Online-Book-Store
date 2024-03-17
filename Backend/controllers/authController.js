const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const usersData = require('../users.json');
const config = require('../config/config');
// const User = require('../models/User');

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = usersData.users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare plaintext passwords (not recommended for production)
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const tokenPayload = { userId: email, role: user.role };
    const token = jwt.sign(tokenPayload, config.jwtSecret);
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.logout = async (req, res) => {
  // You can implement logout functionality here (e.g., clearing tokens)
  res.json({ message: 'Logged out successfully' });
};
