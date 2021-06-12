import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
      setFetched(true);
    };

    fetchProducts();
  }, []);

  console.log(products);
  return (
    fetched ? 
    <>
      <h1 className="mt-4">Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product.id_product} sm={12} md={6} lg={4} className="my-3">
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
      :
    <div className="mt-5 mb-5 text-center">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default HomeScreen;
