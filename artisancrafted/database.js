const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'artisancrafted.db');

class SQLiteWrapper {
  constructor(path) {
    this.rawDb = new DatabaseSync(path);
  }

  pragma(sql) {
    this.rawDb.exec(`PRAGMA ${sql}`);
  }

  exec(sql) {
    return this.rawDb.exec(sql);
  }

  prepare(sql) {
    const stmt = this.rawDb.prepare(sql);
    return {
      get(...params) {
        return stmt.get(...params);
      },
      all(...params) {
        return stmt.all(...params);
      },
      run(...params) {
        const res = stmt.run(...params);
        return {
          changes: Number(res.changes || 0),
          lastInsertRowid: Number(res.lastInsertRowid || 0)
        };
      }
    };
  }

  transaction(fn) {
    return (...args) => {
      this.rawDb.exec('BEGIN TRANSACTION');
      try {
        const result = fn(...args);
        this.rawDb.exec('COMMIT');
        return result;
      } catch (error) {
        this.rawDb.exec('ROLLBACK');
        throw error;
      }
    };
  }
}

const db = new SQLiteWrapper(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'customer' CHECK(role IN ('customer', 'admin')),
      cart TEXT DEFAULT '[]',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL,
      stock INTEGER DEFAULT 0,
      variants TEXT DEFAULT '[]',
      rating REAL DEFAULT 5.0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      order_items TEXT NOT NULL,
      shipping_address TEXT NOT NULL,
      total_amount REAL NOT NULL,
      payment_status TEXT DEFAULT 'Completed' CHECK(payment_status IN ('Pending', 'Completed', 'Failed')),
      fulfillment_status TEXT DEFAULT 'Preparing' CHECK(fulfillment_status IN ('Preparing', 'Shipped', 'Delivered', 'Cancelled')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);
}

module.exports = { db, initializeDatabase };
