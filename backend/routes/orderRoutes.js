import express from 'express';
import { addOrder, getOrderHistory } from '../controllers/orderControllers.js';

const orderRoutes = express.Router();
orderRoutes.post('/submit', addOrder);
orderRoutes.route('/history/:id').get(getOrderHistory);

export default orderRoutes;
