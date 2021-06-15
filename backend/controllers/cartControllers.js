import connection from '../config/db.js';
import asyncHandler from 'express-async-handler';

const addToCart = asyncHandler(async (req, res) => {
  const { id_color, id_size, id_type, id_product, id_user} = req.body;
  connection.query("SELECT * FROM options WHERE options.id_color = ? AND options.id_size = ? AND options.id_type = ? AND options.id_product = ?", [id_color, id_size, id_type, id_product], (error, result) => {
    if (error) {
      throw new Error(error);
    }

    // Check if this option is exist in the options
    if (result.length && result !== "undefined") {
      // If exists: insert existed id_option and id_user into cart_items
      const id_option = result[0].id_option
      connection.query("INSERT INTO cart_items (id_user, id_option) VALUES (?, ?)", [id_user, id_option], (error, result) => {
      })
      res.send({
        id_color, id_size, id_type, id_product, id_user, id_option
      })
    } else {
      // If not exists: adding new option to options
      connection.query("INSERT INTO options (id_color, id_size, id_type, id_product) VALUES (?, ?, ?, ?)", [id_color, id_size, id_type, id_product], (error, result) => {
        if (error) {
            throw new Error(error);
          }
          if (result) {
            // insert existed id_option and id_user into cart_items 
            const id_option = result.insertId;
            connection.query("INSERT INTO cart_items (id_user, id_option) VALUES (?, ?)", [id_user, id_option], (error, result) => {
              if (error) {
                throw new Error(error);
              }
      
              res.send({
                id_color, id_size, id_type, id_product, id_user, id_option
              })
            })
          }
        });
    }
  })
})

const loadCart = asyncHandler(async (req, res) => {
  connection.query("SELECT * FROM cart_items WHERE id_user=?", [req.params.id], (error, response) => {
    if (error) throw new Error (error);
    if (response && response.length) {
      connection.query("SELECT products.id_product, cart_items.id_cart_item, options.id_option, colors.color_name, sizes.size_name, types.type_name, products.product_name, products.product_price, products.imgUrl FROM options, colors, sizes, types, products, cart_items WHERE options.id_color = colors.id_color AND options.id_size = sizes.id_size AND options.id_type = types.id_type AND options.id_product = products.id_product AND cart_items.id_user = ? AND cart_items.id_option = options.id_option", [req.params.id], (error, result) => {
        if (error) throw new Error (error);
        res.json(result)
      })
    } else {
      res.end();
    }
  });
})

const deleteItemFromCart = (async (req, res) => {
  connection.query("DELETE FROM cart_items WHERE cart_items.id_cart_item=?",[req.params.id], (error, result) => {
    if (error) throw new Error(error);
    connection.query("SELECT products.id_product, cart_items.id_cart_item, options.id_option, colors.color_name, sizes.size_name, types.type_name, products.product_name, products.product_price, products.imgUrl FROM options, colors, sizes, types, products, cart_items WHERE options.id_color = colors.id_color AND options.id_size = sizes.id_size AND options.id_type = types.id_type AND options.id_product = products.id_product AND cart_items.id_user = 54 AND cart_items.id_option = options.id_option", [req.params.id], (error, result) => {
      if (error) throw new Error (error);
      
      res.json(result)
    })
  });
})

const clearCart = asyncHandler(async (req, res) => {
  connection.query("DELETE FROM cart_items WHERE id_user = ?", [req.params.id], (error, result) => {
    if (error) throw new Error (error);
    res.end();
  })
})

export {
  addToCart,
  loadCart,
  deleteItemFromCart,
  clearCart
}