import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
const Product = ({ product }) => {
  return (
    <Card className=" p-3 rounded h-100 border-4">
      <Link to={`/product/${product.id_product}`}>
        <Card.Img src={product.imgUrl} variant="top" />
      </Link>
      <Card.Body className="d-flex flex-column text-center">
        <Link to={`/product/${product.id_product}`}>
          <Card.Title as="div">
            <strong className="fs-3">{product.product_name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h3">${product.product_price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
