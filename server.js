// server.js - Final Version with MongoDB Native Driver
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000'], // ← Add Vercel URL later
  credentials: true,
}));
app.use(express.json());

// Environment
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_jwt_secret_123!';
const MONGODB_URI = process.env.MONGODB_URI;

// Global MongoDB client
let db;

// Connect to MongoDB
async function connectDB() {
  const client = new MongoClient(MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    db = client.db('SweetSlice'); // ← Your database name
    console.log('✅ Connected to MongoDB Atlas');
    return db;
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  }
}

// Initialize DB connection on startup
connectDB();

// 🔐 Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// ===== AUTH ROUTES =====

// 🆕 Register (optional)
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const usersCollection = db.collection('users');
  const existingUser = await usersCollection.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    email,
    password: hashedPassword,
    name,
    createdAt: new Date()
  };

  const result = await usersCollection.insertOne(newUser);

  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: result.insertedId.toString(),
      name: newUser.name,
      email: newUser.email
    }
  });
});

// 🔐 Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const usersCollection = db.collection('users');
  const user = await usersCollection.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user._id.toString(), email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email
    }
  });
});

// ===== PRODUCT ROUTES =====

// 📦 GET all products (public)
app.get('/api/products', async (req, res) => {
  try {
    const productsCollection = db.collection('Products'); // ← Your collection name
    const products = await productsCollection.find().toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// 🔍 GET single product by id
app.get('/api/products/:id', async (req, res) => {
  try {
    const productsCollection = db.collection('Products');
    const id = parseInt(req.params.id);
    const product = await productsCollection.findOne({ id });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// ➕ POST new product (protected)
app.post('/api/products', authenticateToken, async (req, res) => {
  try {
    const { title, shortDesc, fullDesc, price, category, image } = req.body;

    if (!title || !shortDesc || !price) {
      return res.status(400).json({ error: 'Title, short description, and price required' });
    }

    const productsCollection = db.collection('Products');
    const lastProduct = await productsCollection.findOne({}, { sort: { id: -1 } });
    const newId = lastProduct ? lastProduct.id + 1 : 1;

    const newProduct = {
      id: newId,
      title,
      shortDesc,
      fullDesc: fullDesc || '',
      price,
      category: category || 'Uncategorized',
      image: image || 'https://via.placeholder.com/400x300?text=No+Image',
      dateAdded: new Date().toISOString().split('T')[0]
    };

    const result = await productsCollection.insertOne(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// 🗑️ DELETE product by id (protected)
app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    const productsCollection = db.collection('Products');
    const id = parseInt(req.params.id);

    const result = await productsCollection.deleteOne({ id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// 🧪 Health check
app.get('/', (req, res) => {
  res.json({
    message: 'SweetSlice Backend is running 🍰',
    dbConnected: !!db
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});