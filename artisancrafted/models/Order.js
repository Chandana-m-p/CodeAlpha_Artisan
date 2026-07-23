const { db } = require('../database');

const Order = {
  find(filter = {}, sort = null) {
    let query = 'SELECT * FROM orders WHERE 1=1';
    const params = [];

    if (filter.user_id) {
      query += ' AND user_id = ?';
      params.push(filter.user_id);
    }

    if (filter.fulfillmentStatus) {
      query += ' AND fulfillment_status = ?';
      params.push(filter.fulfillmentStatus);
    }

    if (sort) {
      const sortKey = Object.keys(sort)[0];
      const sortDir = sort[sortKey] === -1 ? 'DESC' : 'ASC';
      const columnMap = {
        createdAt: 'created_at',
        totalAmount: 'total_amount'
      };
      const column = columnMap[sortKey] || sortKey;
      query += ` ORDER BY ${column} ${sortDir}`;
    }

    const rows = db.prepare(query).all(...params);
    return rows.map(this._parseRow);
  },

  findById(id) {
    const row = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
    return row ? this._parseRow(row) : null;
  },

  create(data) {
    const stmt = db.prepare(`
      INSERT INTO orders (user_id, order_items, shipping_address, total_amount, payment_status, fulfillment_status)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.user,
      JSON.stringify(data.orderItems),
      JSON.stringify(data.shippingAddress),
      data.totalAmount,
      data.paymentStatus || 'Completed',
      data.fulfillmentStatus || 'Preparing'
    );
    return this.findById(result.lastInsertRowid);
  },

  aggregate(pipeline = []) {
    let totalRevenue = 0;
    let orderCount = 0;

    const row = db.prepare(`
      SELECT
        SUM(total_amount) as totalRevenue,
        COUNT(*) as orderCount
      FROM orders
    `).get();

    return [{
      _id: null,
      totalRevenue: row.totalRevenue || 0,
      orderCount: row.orderCount || 0
    }];
  },

  countDocuments(filter = {}) {
    let query = 'SELECT COUNT(*) as count FROM orders WHERE 1=1';
    const params = [];

    if (filter.fulfillmentStatus) {
      if (filter.fulfillmentStatus.$nin) {
        const excluded = filter.fulfillmentStatus.$nin;
        query += ` AND fulfillment_status NOT IN (${excluded.map(() => '?').join(',')})`;
        params.push(...excluded);
      } else {
        query += ' AND fulfillment_status = ?';
        params.push(filter.fulfillmentStatus);
      }
    }

    return db.prepare(query).get(...params).count;
  },

  _parseRow(row) {
    return {
      _id: row.id,
      id: row.id,
      user: row.user_id,
      orderItems: JSON.parse(row.order_items || '[]'),
      shippingAddress: JSON.parse(row.shipping_address || '{}'),
      totalAmount: row.total_amount,
      paymentStatus: row.payment_status,
      fulfillmentStatus: row.fulfillment_status,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
};

module.exports = Order;
