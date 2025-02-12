const express = require('express');
const { Company, Review, User } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const companies = await Company.findAll({
      include: [
        {
          model: Review,
          as: 'reviews',
          include: [
            {
              model: User,
              as: 'user',
            },
          ],
        },
      ],
    });
    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findOne({
      where: { id: id },
      include: [
        {
          model: Review,
          as: 'reviews',
          include: [
            {
              model: User,
              as: 'user',
            },
          ],
        },
      ],
    });
    if (!company) return res.status(404).json({ error: 'Company not found' });

    res.json(company);
  } catch (error) {
    res.json( error);
  }
});


router.post('/', async (req, res) => {
  try {
    const { name, location, website, verified, email, logoUrl, password, description } = req.body;
    const company = await Company.create({ name, location, website, verified, email, logoUrl, password, description });
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create company' });
  }
});

router.post('/bulk', async (req, res) => {
  try {
    const companies = req.body;
    const company = await Company.bulkCreate(companies);
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create company' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, website, verified, email, logoUrl, description } = req.body;
    const company = await Company.findByPk(id);

    if (!company) return res.status(404).json({ error: 'Company not found' });

    company.name = name;
    company.location = location;
    company.website = website;
    company.verified = verified;
    company.email = email;
    company.logoUrl = logoUrl;
    company.description = description;
    await company.save();

    res.json(company);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update company' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);

    if (!company) return res.status(404).json({ error: 'Company not found' });

    await company.destroy();
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete company' });
  }
});

module.exports = router;
