const express = require('express');
const { db } = require('../database');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect, admin);

router.get('/metrics', async (req, res, next) => {
  try {
    const totalRevenueResult = Order.aggregate();
    const totalRevenue = totalRevenueResult[0]?.totalRevenue || 0;
    const orderCount = totalRevenueResult[0]?.orderCount || 0;

    const activeOrdersCount = Order.countDocuments({
      fulfillmentStatus: { $nin: ['Delivered', 'Cancelled'] }
    });

    const lowStockRows = db.prepare(`
      SELECT * FROM products WHERE stock <= 5 ORDER BY stock ASC LIMIT 10
    `).all();
    const lowStockProducts = lowStockRows.map(row => Product._parseRow(row));

    const recentSalesRows = db.prepare(`
      SELECT id, total_amount, created_at, fulfillment_status
      FROM orders
      ORDER BY created_at DESC
      LIMIT 6
    `).all();
    const recentSales = recentSalesRows.map(row => ({
      _id: row.id,
      totalAmount: row.total_amount,
      createdAt: row.created_at,
      fulfillmentStatus: row.fulfillment_status
    }));

    res.json({
      totalRevenue,
      orderCount,
      activeOrdersCount,
      lowStockProducts,
      recentSales
    });
  } catch (error) {
    next(error);
  }
});

router.get('/orders', async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.fulfillmentStatus = status;

    const orders = Order.find(filter, { createdAt: -1 });

    const enrichedOrders = orders.map(order => {
      const user = require('../models/User').findById(order.user);
      return {
        ...order,
        user: user ? { name: user.name, email: user.email } : null
      };
    });

    res.json(enrichedOrders);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
