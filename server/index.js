const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB bağlantısı başarılı');
}).catch((error) => {
  console.error('MongoDB bağlantı hatası:', error);
});

app.use('/api/bakery', productRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Protect routes using authMiddleware
// Example:
// app.use('/api/protected-route', authMiddleware, protectedRoute);

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Please use a different port.`);
  } else {
    console.error('Server error:', error);
  }
});
