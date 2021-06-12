import express from 'express';
import dotenv from 'dotenv';
import dataBase from './config/db.js';
import products from './data/products.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/products', productRoutes);

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);
