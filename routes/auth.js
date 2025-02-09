const express = require('express');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();


router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.create({email, username, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid Username or Pssword' });
    }
    console.log('user exist')
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return  res.json({success:true, token: token, message: 'Login successful'});
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid Username or Pssword' });
    
  }

});

module.exports = router;
