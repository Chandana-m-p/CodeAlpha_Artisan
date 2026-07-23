const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initializeDatabase } = require('./database');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const Product = require('./models/Product');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

initializeDatabase();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Page Routes
app.get('/', (req, res) => res.render('index', { title: 'Home' }));
app.get('/login', (req, res) => res.render('login', { title: 'Sign In' }));
app.get('/register', (req, res) => res.render('register', { title: 'Create Account' }));
app.get('/catalog', (req, res) => {
  try {
    const products = Product.find({}, { createdAt: -1 });
    res.render('catalog', { title: 'Collections', products });
  } catch (error) {
    res.render('catalog', { title: 'Collections', products: [] });
  }
});
app.get('/product/:id', (req, res) => res.render('product', { title: 'Product', productId: req.params.id }));
app.get('/cart', (req, res) => res.render('cart', { title: 'Your Collection' }));
app.get('/checkout', (req, res) => res.render('checkout', { title: 'Secure Checkout' }));
app.get('/success', (req, res) => res.render('order-success', { title: 'Order Confirmed' }));
app.get('/account', (req, res) => res.render('account', { title: 'My Account' }));
app.get('/admin', (req, res) => res.render('admin/dashboard', { title: 'Admin Dashboard' }));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log('SQLite database initialized');
});
