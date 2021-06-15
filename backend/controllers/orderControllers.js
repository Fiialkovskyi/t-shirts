import connection from '../config/db.js';
import asyncHandler from 'express-async-handler';

const addOrder = asyncHandler(async (req, res) => {
  const {id_user, id_order_status, id_payment, id_shipping_method, address, city, country,  zip_code, phone_number, order_date, orderItems} = req.body;

  connection.query("INSERT INTO orders (id_user, id_order_status, id_payment, id_shipping_method, address, city, country, zip_code, phone_number, order_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_user, id_order_status, id_payment, id_shipping_method, address, city, country,  zip_code, phone_number, order_date], (error, result) => {
    if (error) throw new Error(error);
    if(result.insertId) {
      const orderId = result.insertId;
      const arrayForOrderItems = Object.values(orderItems.map(item => {
        return Object.values({ orderId: orderId, ...item})
      }))

      const values = [[orderId, 52, 10], [orderId, 52, 11], [orderId, 52, 11]]
      connection.query("INSERT INTO order_items (id_order, id_option, price) VALUES ?", [arrayForOrderItems] , (error, result) => {
        if (error) throw new Error(error);
        res.json(orderId);
      })
    }
  })
  
})

const getOrderHistory = asyncHandler(async(req, res) => {
  connection.query("SELECT orders.id_order, order_status.status_name, payments.payment_name, shipping_methods.shipping_carrier, orders.address, orders.city, orders.country, orders.zip_code, orders.phone_number, orders.order_date, order_items.price, sizes.size_name, colors.color_name, types.type_name, products.imgUrl, products.product_name FROM order_status, payments, orders, users, shipping_methods, order_items, options, sizes, colors, types, products WHERE orders.id_order_status = order_status.id_order_status AND payments.id_payment = orders.id_payment AND shipping_methods.id_shipping_method = orders.id_shipping_method AND (sizes.id_size = options.id_size AND options.id_option = order_items.id_option AND order_items.id_order = orders.id_order AND colors.id_color = options.id_color AND types.id_type = options.id_type)AND products.id_product = options.id_product AND users.id_user = ?",[req.params.id], (error, result) => {
    if (error) throw new Error;
    res.json(result);
  })
})

export {
  addOrder,
  getOrderHistory
}