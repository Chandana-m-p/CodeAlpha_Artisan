const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', async (req, res, next) => {
  try {
    const user = User.findById(req.user.id);
    if (!user) {
      res.status(404);
      return next(new Error('User not found'));
    }
    const cart = user.cart.map(item => {
      const product = Product.findById(item.product);
      return {
        ...item,
        product: product || item.product
      };
    });
    res.json(cart || []);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = User.findById(req.user.id);
    if (!user) {
      res.status(404);
      return next(new Error('User not found'));
    }

    const { productId, quantity = 1, selectedVariant } = req.body;
    const product = Product.findById(productId);

    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }

    const existingItem = user.cart.find(
      (item) => item.product == productId && item.selectedVariant === selectedVariant
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      user.cart.push({ product: productId, quantity, selectedVariant });
    }

    User.update(user.id, { cart: user.cart });
    res.status(201).json(user.cart);
  } catch (error) {
    next(error);
  }
});

router.put('/:productId', async (req, res, next) => {
  try {
    const user = User.findById(req.user.id);
    if (!user) {
      res.status(404);
      return next(new Error('User not found'));
    }

    const { productId } = req.params;
    const { quantity, selectedVariant } = req.body;

    const item = user.cart.find(
      (cartItem) => cartItem.product == productId && cartItem.selectedVariant === selectedVariant
    );
    if (!item) {
      res.status(404);
      return next(new Error('Cart item not found'));
    }

    item.quantity = quantity;
    User.update(user.id, { cart: user.cart });
    res.json(user.cart);
  } catch (error) {
    next(error);
  }
});

router.delete('/:productId', async (req, res, next) => {
  try {
    const user = User.findById(req.user.id);
    if (!user) {
      res.status(404);
      return next(new Error('User not found'));
    }

    const { productId } = req.params;
    const { selectedVariant } = req.body;

    user.cart = user.cart.filter(
      (cartItem) => cartItem.product != productId || cartItem.selectedVariant !== selectedVariant
    );
    User.update(user.id, { cart: user.cart });
    res.json(user.cart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
