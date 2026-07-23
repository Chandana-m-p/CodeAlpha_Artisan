const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    const { category, price, search } = req.query;

    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: 'i' };
    if (price === 'under100') filter.price = { $lt: 100 };
    if (price === 'under500') filter.price = { $lt: 500 };
    if (price === '500plus') filter.price = { $gte: 500 };

    const products = Product.find(filter, { createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
