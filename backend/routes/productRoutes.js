import express from 'express';
import connection from '../config/db.js';

const productRoutes = express.Router();

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
productRoutes.get('/', (req, res) => {
  connection.query(
    'SELECT categories.*, products.id_product, products.product_name, products.id_matherial, matherials.matherial_name, products.product_price, products.imgUrl FROM categories, products, categories_products, matherials WHERE categories.id_category = categories_products.id_category AND categories_products.id_product = products.id_product AND products.id_matherial = matherials.id_matherial',
    (err, result) => {
      if (err) throw new Error(err);
       res.json(result);
    }
  );
});

// @desc   Fetch single product
// @route  GET /api/products/:id
// @access Public
productRoutes.get('/:id', async (req, res) => {
  const data = {};

  const fetchProduct = new Promise((resolve, reject) => {
    connection.query(
      `SELECT categories.*, products.id_product, products.product_name, products.id_matherial, matherials.matherial_name, products.product_price, products.imgUrl FROM categories, products, categories_products, matherials WHERE categories.id_category = categories_products.id_category AND categories_products.id_product = products.id_product AND products.id_matherial = matherials.id_matherial AND products.id_product = ${req.params.id}`,
      (err, result) => {
        if (err) throw new Error(err);
        if (result) {
          resolve(result[0]);
        } else {
          console.log(`Error: Product with Id ${req.params.id} not found`.red);
          res.status(404);
          res.end();
        }
      }
    );
  }).then(result => data.product = result);

  const fetchColors = new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM colors',
      (err, result) => {
        if (err) throw new Error(err);
        resolve(result)
      }
    );
  }).then((result) => data.colors = result);

  const fetchSizes = new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM sizes',
      (err, result) => {
        if (err) throw new Error(err);
        resolve(result)
      }
    );
  }).then((result) => data.sizes = result);

  const fetchTypes = new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM types',
      (err, result) => {
        if (err) throw new Error(err);
        resolve(result)
      }
    );
  }).then((result) => data.types = result);

  Promise.all([fetchProduct, fetchColors, fetchSizes, fetchTypes]).then(() => res.json(data))
});

export default productRoutes;
