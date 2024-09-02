const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { generateToken, verifyToken } = require('../middleware/token');
require('dotenv').config();
const register = async (req, res) => {
  const { username,email, password, role, organizationId } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      organizationId,
    });

    return res.status(201).json({ id: user.id, username: user.username, role: user.role });
};

// Login a user
const loginUser = async (req, res) => {
  
        const { email, password } = req.body;
const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = generateToken(user.id,user.organizationId,user.email);
        res.status(200).json({ message: 'Login successful', token });
     
    
};

module.exports = { register, loginUser };
