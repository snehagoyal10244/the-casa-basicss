/**
 * THE CASA BASICS — Express Backend Server
 * ─────────────────────────────────────────
 * Start: node server.js   (production)
 *        npm run dev       (development with nodemon)
 */

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');

const connectDB    = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// ── Routes ────────────────────────────────────────────────
const authRoutes     = require('./routes/auth.routes');
const productRoutes  = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const cartRoutes     = require('./routes/cart.routes');
const wishlistRoutes = require('./routes/wishlist.routes');
const orderRoutes    = require('./routes/order.routes');
const paymentRoutes  = require('./routes/payment.routes');
const reviewRoutes   = require('./routes/review.routes');
const supportRoutes  = require('./routes/support.routes');
const aiRoutes       = require('./routes/ai.routes');
const bundleRoutes   = require('./routes/bundle.routes');
const adminRoutes    = require('./routes/admin.routes');

// ── Connect DB ────────────────────────────────────────────
connectDB();

// ── App ───────────────────────────────────────────────────
const app = express();

// CORS — read allowed origins from .env
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, Postman, same-server)
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

// Raw body required by Stripe webhook BEFORE json parser
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

// JSON + URL-encoded body parsing
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// HTTP request logger (dev only)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ── Health check ──────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'THE CASA BASICS API is running ✅',
    version: '1.0.0',
    env:     process.env.NODE_ENV,
  });
});

app.get('/api/health', (req, res) => {
  res.json({ success: true, uptime: process.uptime(), timestamp: new Date() });
});

// ── Mount Routes ──────────────────────────────────────────
app.use('/api/auth',       authRoutes);
app.use('/api/products',   productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart',       cartRoutes);
app.use('/api/wishlist',   wishlistRoutes);
app.use('/api/orders',     orderRoutes);
app.use('/api/payments',   paymentRoutes);
app.use('/api/reviews',    reviewRoutes);
app.use('/api/support',    supportRoutes);
app.use('/api/ai',         aiRoutes);
app.use('/api/bundles',    bundleRoutes);
app.use('/api/admin',      adminRoutes);

// ── 404 handler ───────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found.` });
});

// ── Global error handler (must be last) ──────────────────
app.use(errorHandler);

// ── Start ─────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀  THE CASA BASICS backend running on port ${PORT}`);
  console.log(`   Mode : ${process.env.NODE_ENV || 'development'}`);
  console.log(`   URL  : http://localhost:${PORT}\n`);
});
