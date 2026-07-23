const { db } = require('../database');

const User = {
  findOne(filter = {}) {
    let query = 'SELECT * FROM users WHERE 1=1';
    const params = [];

    if (filter.email) {
      query += ' AND email = ?';
      params.push(filter.email);
    }

    if (filter.id) {
      query += ' AND id = ?';
      params.push(filter.id);
    }

    const row = db.prepare(query).get(...params);
    return row ? this._parseRow(row) : null;
  },

  findById(id) {
    const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    return row ? this._parseRow(row) : null;
  },

  create(data) {
    const stmt = db.prepare(`
      INSERT INTO users (name, email, password, role, cart)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.name,
      data.email,
      data.password,
      data.role || 'customer',
      JSON.stringify(data.cart || [])
    );
    return this.findById(result.lastInsertRowid);
  },

  update(id, updates) {
    const fields = [];
    const params = [];

    for (const [key, value] of Object.entries(updates)) {
      if (key === 'cart') {
        fields.push('cart = ?');
        params.push(JSON.stringify(value));
      } else {
        fields.push(`${key} = ?`);
        params.push(value);
      }
    }

    params.push(id);
    db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`).run(...params);
    return this.findById(id);
  },

  _parseRow(row) {
    return {
      _id: row.id,
      id: row.id,
      name: row.name,
      email: row.email,
      password: row.password,
      role: row.role,
      cart: JSON.parse(row.cart || '[]'),
      createdAt: row.created_at
    };
  }
};

module.exports = User;
