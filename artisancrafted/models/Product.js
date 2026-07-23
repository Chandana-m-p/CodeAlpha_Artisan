const { db } = require('../database');

const Product = {
  find(filter = {}, sort = null) {
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (filter.category) {
      query += ' AND category = ?';
      params.push(filter.category);
    }

    if (filter.title && typeof filter.title === 'object' && filter.title.$regex) {
      query += ' AND title LIKE ?';
      params.push(`%${filter.title.$regex}%`);
    }

    if (filter.price && typeof filter.price === 'object') {
      if (filter.price.$lt !== undefined) {
        query += ' AND price < ?';
        params.push(filter.price.$lt);
      }
      if (filter.price.$gte !== undefined) {
        query += ' AND price >= ?';
        params.push(filter.price.$gte);
      }
    }

    if (sort) {
      const sortKey = Object.keys(sort)[0];
      const sortDir = sort[sortKey] === -1 ? 'DESC' : 'ASC';
      const columnMap = { createdAt: 'created_at', updatedAt: 'updated_at' };
      const column = columnMap[sortKey] || sortKey;
      query += ` ORDER BY ${column} ${sortDir}`;
    }

    const rows = db.prepare(query).all(...params);
    return rows.map(this._parseRow);
  },

  findById(id) {
    const row = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    return row ? this._parseRow(row) : null;
  },

  create(data) {
    const stmt = db.prepare(`
      INSERT INTO products (title, description, price, category, image, stock, variants, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.title,
      data.description,
      data.price,
      data.category,
      data.image,
      data.stock || 0,
      JSON.stringify(data.variants || []),
      data.rating || 5.0
    );
    return this.findById(result.lastInsertRowid);
  },

  insertMany(items) {
    const insertMany = db.transaction((products) => {
      for (const product of products) {
        this.create(product);
      }
    });
    insertMany(items);
  },

  deleteMany(filter = {}) {
    if (Object.keys(filter).length === 0) {
      db.exec('DELETE FROM products');
    }
  },

  update(id, updates) {
    const fields = [];
    const params = [];

    for (const [key, value] of Object.entries(updates)) {
      if (key === 'variants') {
        fields.push('variants = ?');
        params.push(JSON.stringify(value));
      } else {
        fields.push(`${key} = ?`);
        params.push(value);
      }
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    params.push(id);

    db.prepare(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`).run(...params);
    return this.findById(id);
  },

  count(filter = {}) {
    let query = 'SELECT COUNT(*) as count FROM products WHERE 1=1';
    const params = [];

    if (filter.stock !== undefined) {
      if (filter.stock.$lte !== undefined) {
        query += ' AND stock <= ?';
        params.push(filter.stock.$lte);
      }
    }

    return db.prepare(query).get(...params).count;
  },

  _parseRow(row) {
    return {
      _id: row.id,
      id: row.id,
      title: row.title,
      description: row.description,
      price: row.price,
      category: row.category,
      image: row.image,
      stock: row.stock,
      variants: JSON.parse(row.variants || '[]'),
      rating: row.rating,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
};

module.exports = Product;
