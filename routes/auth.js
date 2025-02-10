const express = require('express');
const { User, Review } = require('../models');
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

router.post('/register/bulk', async (req, res) => {
  try {
    const payload = req.body;
    const users = await User.bulkCreate(payload);
    res.status(201).json({ success:true, message: 'User registered successfully',  data: users});
    // res.status(201).json();
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
})

router.get('/users/:id', async (req, res) => {
  const users = await User.findOne({
    where: { id: req.params.id },
      include: [
        {
          model: Review,
        },
      ],
  });
  res.json(users);
})


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid Username or Pssword' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const payload = { token:token, user: user };
    return  res.json({success:true, message: 'Login successful', data: payload});
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid Username or Pssword' });
    
  }

});

module.exports = router;
