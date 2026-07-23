const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/', async (req, res, next) => {
  try {
    const user = User.findById(req.user.id);
    if (!user || !user.cart.length) {
      res.status(400);
      return next(new Error('Cart is empty'));
    }

    const { shippingAddress } = req.body;
    if (!shippingAddress || !shippingAddress.firstName || !shippingAddress.lastName || !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
      res.status(400);
      return next(new Error('Complete shipping address is required'));
    }

    const orderItems = user.cart.map((item) => {
      const product = Product.findById(item.product);
      return {
        product: item.product,
        quantity: item.quantity,
        selectedVariant: item.selectedVariant,
        price: product ? product.price : 0
      };
    });

    const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = Order.create({
      user: user.id,
      orderItems,
      shippingAddress,
      totalAmount,
      paymentStatus: 'Completed'
    });

    user.cart = [];
    User.update(user.id, { cart: [] });

    res.status(201).json({ orderId: order.id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
