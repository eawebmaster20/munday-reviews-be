const express = require('express');
const { Review, Company } = require('../models');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();


router.post('/', authenticate, async (req, res) => {
  const { content, rating, companyId } = req.body;
  const review = await Review.create({ content, rating, companyId, UserId: req.user.id });
  res.status(201).json(review);
});


router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { content, rating } = req.body;
  const review = await Review.findOne({ where: { id, UserId: req.user.id } });

  if (!review) {
    return res.status(404).json({ error: 'Review not found' });
  }

  review.content = content;
  review.rating = rating;
  await review.save();
  res.json(review);
});


router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const review = await Review.findOne({ where: { id, UserId: req.user.id } });

  if (!review) {
    return res.status(404).json({ error: 'Review not found' });
  }

  await review.destroy();
  res.json({ message: 'Review deleted' });
});


router.get('/company/:companyId', async (req, res) => {
  const { companyId } = req.params;
  const reviews = await Review.findAll({ where: { companyId }, include: ['User'] });
  res.json(reviews);
});

module.exports = router;
