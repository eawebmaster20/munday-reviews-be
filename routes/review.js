const express = require('express');
const { Review, User } = require('../models');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();


router.post('/', authenticate, async (req, res) => {
  const { title, content, rating, companyId, userId } = req.body;
  const review = await Review.create({ title, content, rating, companyId, userId });
  res.status(201).json(review);
});

router.post('/bulk', authenticate, async (req, res) => {
  const payload = req.body;
  const review = await Review.bulkCreate(payload);
  res.status(201).json({success: true, data:review, message: 'Review successfully created'});
});

router.get('/', async (req, res) => {
  const review = await Review.findAll({
    include: [
      {
        model: User,
        as: 'user',  
      },
    ],
  });
  res.status(201).json(review);
});


router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, content, rating, companyId, userId } = req.body;
  const review = await Review.findOne({ where: { id, userId: userId } });

  if (!review) {
    return res.status(404).json({ error: 'Review not found' });
  }

  review.title = title;
  review.content = content;
  review.companyId = companyId;
  review.userId = userId;
  review.rating = rating;
  await review.save();
  res.json(review);
});


router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const review = await Review.findOne({ where: { id } });

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
