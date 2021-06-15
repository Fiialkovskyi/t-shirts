import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Card, Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SelectedRow from '../components/SelectedRow';
import Loader from '../components/Loader';
import { listProductDetails } from '../actions/productActions';
import Message from '../components/Message';
import { addToCart, loadCart } from '../actions/cartActions';

const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const productDetais = useSelector((state) => state.productDetails);
  const { loading, error, productInfo = [] } = productDetais;
  const { product, colors, sizes, types } = productInfo;
  const [selectedColor, setSelectedColor] = useState({
    id_color: 1,
    color_name: 'White',
  });
  const [selectedSize, setSelectedSize] = useState({ id_size: 1, size_name: 'S' });
  const [selectedType, setSelectedType] = useState({ id_type: 1, type_name: 'Men' });

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [selectedOption, setSelectedOption] = useState({
    id_color: 1,
    id_size: 1,
    id_type: 1,
    id_product: match.params.id,
    id_user: userInfo?.id_user || null,
  });

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch]);

  const selectColor = (item) => {
    setSelectedColor(item);
    setSelectedOption({ ...selectedOption, id_color: item.id_color });
  };

  const selectSize = (item) => {
    setSelectedSize(item);
    setSelectedOption({ ...selectedOption, id_size: item.id_size });
  };

  const selectType = (item) => {
    setSelectedType(item);
    setSelectedOption({ ...selectedOption, id_type: item.id_type });
  };

  const addToCartHandler = () => {
    if (userInfo) {
      dispatch(addToCart(selectedOption));
      dispatch(loadCart(userInfo.id_user));
      history.push('/cart');
    } else {
      history.push('/login');
    }
  };

  return loading ? (
    <Loader marginTop={'mt-3'} />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
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
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
