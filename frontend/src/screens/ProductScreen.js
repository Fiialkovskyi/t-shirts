import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Image, Card, Button, ListGroup, Spinner } from 'react-bootstrap';
import SelectedRow from '../components/SelectedRow';

const ProductScreen = ({ match }) => {
  const [productInfo, setProductInfo] = useState({});
  const { product, colors, sizes, types } = productInfo;
  const [selectedColor, setSelectedColor] = useState({});
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedType, setSelectedType] = useState({});
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProductInfo(data);
      setFetched(true);
      setSelectedColor(data.colors[0]);
      setSelectedSize(data.sizes[0]);
      setSelectedType(data.types[0]);
    };

    fetchProduct();
  }, [match]);

  const selectColor = (item) => {
    setSelectedColor(item);
  }

  const selectSize = (item) => {
    setSelectedSize(item)
  }
  
  const selectType = (item) => {
    setSelectedType(item)
  }

  console.log(productInfo);
  console.log('colors', colors);

  

  return fetched ? (
    <>
      <h1 className="mt-5 text-center">{product.product_name}</h1>
      <Row className="mt-5">
        <Col md={4} lg={6} xl={3} className="text-center">
          <Image src={product.imgUrl} alt={product.product_name} fluid />
        </Col>
        <Col md={8} lg={6} xl={5} className="mt-5">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Options:</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col sm={3}>Select color:</Col>
                <Col sm={9}>
                  <div className="color-picker">
                    {colors.map((item) => {
                      return (
                        <button
                          key={item.id_color}
                          style={{ background: item.color_name }}
                          className={
                            selectedColor.id_color === item.id_color
                              ? 'color-btn color-btn--active'
                              : 'color-btn'
                          }
                          onClick={() => selectColor(item)}
                        ></button>
                      );
                    })}
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col sm={3}>Select size:</Col>
                <Col sm={9}>
                  <div className="size-picker">
                    {sizes.map((item) => {
                      return (
                        <button
                          key={item.id_size}
                          className={
                            selectedSize.id_size === item.id_size
                              ? 'size-btn size-btn--active'
                              : 'size-btn'
                          }
                          onClick={() => selectSize(item)}
                        >
                          {item.size_name}
                        </button>
                      );
                    })}
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col sm={3}>Select type:</Col>
                <Col sm={9}>
                  <div className="type-picker">
                    {types.map((item) => {
                      return (
                        <button
                          key={item.id_type}
                          className={
                            selectedType.id_type === item.id_type
                              ? 'type-btn type-btn--active'
                              : 'type-btn'
                          }
                          onClick={() => selectType(item)}
                        >
                          {item.type_name}
                        </button>
                      );
                    })}
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col lg={6} xl={4} className="mt-5 mx-auto">
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3 className="text-center">{product.product_name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <SelectedRow label={'Color:'} value={selectedColor.color_name} />
              </ListGroup.Item>
              <ListGroup.Item>
                <SelectedRow label={'Size:'} value={selectedSize.size_name} />
              </ListGroup.Item>
              <ListGroup.Item>
                <SelectedRow label={'Type:'} value={selectedType.type_name} />
              </ListGroup.Item>
              <ListGroup.Item>
                <SelectedRow label={'Material :'} value={product.matherial_name} />
              </ListGroup.Item>
              <ListGroup.Item>
                <SelectedRow label={'Category :'} value={product.category_name} />
              </ListGroup.Item>
              <ListGroup.Item className="text-center">
                <Button
                  className="btn-block"
                  type="buttom"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  ) : (
    <div className="mt-5 mb-5 text-center">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default ProductScreen;
