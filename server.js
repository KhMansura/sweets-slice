const express = require('express');
const cors = require('cors')
const app = express();

// const port = 5000
//middleware
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use(express.json());

//In-memory store (like your products.json)
let products =[
    {
    "id": 1,
    "title": "Classic Chocolate Cake",
    "shortDesc": "Rich, moist chocolate cake with creamy ganache frosting.",
    "fullDesc": "Our signature chocolate cake made with premium cocoa, layered with silky chocolate ganache. Perfect for birthdays and celebrations. Contains eggs, dairy, and gluten.",
    "price": "৳1,200",
    "category": "Cakes",
    "image": "https://i.ibb.co/B5QDHQJz/download-10.jpg",
    "dateAdded": "2025-11-01"
    }
];

//Routes
app.get('/api/products', (req, res) => {
  res.json('products');
})

app.post('/api/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body,
    dateAdded: new Date().toISOString().split('T')[0],
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.json({ message: "Deleted" });
});

// Health check
app.get('/', (req, res) => {
  res.json({ message: "SweetSlice Backend is running 🍰" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
