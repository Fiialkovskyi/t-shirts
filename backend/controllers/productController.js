import connection from '../config/db.js';

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = (req, res) => {
  connection.execute(
    'SELECT categories.*, products.id_product, products.product_name, products.id_matherial, matherials.matherial_name, products.product_price, products.imgUrl FROM categories, products, categories_products, matherials WHERE categories.id_category = categories_products.id_category AND categories_products.id_product = products.id_product AND products.id_matherial = matherials.id_matherial',
    (err, result) => {
      if (err) throw new Error(err);
      res.json(result);
    }
  );
};

// @desc   Fetch single product
// @route  GET /api/products/:id
// @access Public
const getProductInfo = (req, res) => {
  const data = {};

  const fetchProduct = new Promise((resolve, reject) => {
    connection.execute(
      `SELECT categories.*, products.id_product, products.product_name, products.id_matherial, matherials.matherial_name, products.product_price, products.imgUrl FROM categories, products, categories_products, matherials WHERE categories.id_category = categories_products.id_category AND categories_products.id_product = products.id_product AND products.id_matherial = matherials.id_matherial AND products.id_product = ${req.params.id}`,
      (err, result) => {
        if (err) throw new Error(err);

        if (result[0]) {
          resolve(result[0]);
        } else {
          reject();
        }
      }
    );
  })
    .then((result) => (data.product = result))
    .catch(() => {
      res.status(404);
      res.end();
    });

  const fetchColors = new Promise((resolve, reject) => {
    connection.execute('SELECT * FROM colors', (err, result) => {
      if (err) throw new Error(err);
      resolve(result);
    });
  }).then((result) => (data.colors = result));

  const fetchSizes = new Promise((resolve, reject) => {
    connection.execute('SELECT * FROM sizes', (err, result) => {
      if (err) throw new Error(err);
      resolve(result);
    });
  }).then((result) => (data.sizes = result));

  const fetchTypes = new Promise((resolve, reject) => {
    connection.execute('SELECT * FROM types', (err, result) => {
      if (err) throw new Error(err);
      resolve(result);
    });
  }).then((result) => (data.types = result));

  Promise.all([fetchProduct, fetchColors, fetchSizes, fetchTypes])
    .then(() => res.json(data))
    .catch(() => {
      res.end();
    });
};

export { getProducts, getProductInfo };
