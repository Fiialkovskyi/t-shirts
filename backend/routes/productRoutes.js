import express from 'express';
import { getProducts, getProductInfo } from '../controllers/productController.js';

const productRoutes = express.Router();

productRoutes.route('/').get(getProducts);
productRoutes.route('/:id').get(getProductInfo);

export default productRoutes;
