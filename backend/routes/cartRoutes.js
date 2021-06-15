import express from 'express';
import {
  addToCart,
  loadCart,
  deleteItemFromCart,
  clearCart,
} from '../controllers/cartControllers.js';

const cartRoutes = express.Router();

cartRoutes.post('/add', addToCart);
cartRoutes.route('/delete/:id').get(deleteItemFromCart);
cartRoutes.route('/load-cart/:id').get(loadCart);
cartRoutes.route('/clear-cart/:id').get(clearCart);

export default cartRoutes;
