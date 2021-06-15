import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { loadCart, removeItemFromCart } from '../actions/cartActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import SelectedRow from '../components/SelectedRow';

const CartScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { loading, error, cartItems = [] } = cart;
  const userLogin = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userLogin.userInfo) {
      dispatch(loadCart(userLogin.userInfo.id_user));
    }
  }, [dispatch]);

  const { userInfo } = userLogin;

  const removeItem = (e) => {
    dispatch(removeItemFromCart(e));
  
  };

  const checkoutHandler = () => {
    if (userLogin) {
      history.push('/order/checkout');
    }
  };

  if (!userInfo) {
    return (
      <h1 className="mt-4">
        Please <Link to="/login">Sign In</Link>
      </h1>
    );
  }

  return loading ? (
    <Loader marginTop={'mt-2'} />
  ) : error ? (
    <Message variant="danger">Oops, Something Went Wrong</Message>
  ) : cartItems.length ? (
    <Row className="mt-5">
      <Col md="8">
        <ListGroup variant="flush">
          {cartItems.map((item) => {
            return (
              <ListGroup.Item key={item.id_cart_item}>
                <Row>
                  <Col md={4} className="d-flex align-items-center">
                    <Image src={item.imgUrl} alt={item.product_name} fluid rounded />
                  </Col>
                  <Col md={7}>
                    <ListGroup variant="flush" className="mt-4 mb-4">
                      <ListGroup.Item>
                        <SelectedRow
                          label={'Product:'}
                          value={item.product_name}
                        ></SelectedRow>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <SelectedRow
                          label={'Price:'}
                          value={item.product_price}
                        ></SelectedRow>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <SelectedRow
                          label={'Color:'}
                          value={item.color_name}
                        ></SelectedRow>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <SelectedRow label={'Size:'} value={item.size_name}></SelectedRow>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <SelectedRow label={'Type:'} value={item.type_name}></SelectedRow>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col
                    md={1}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeItem(item.id_cart_item)}
                    >
                      <i className="fas fa-trash" style={{ fontSize: '20px' }}></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.length})) items</h2>
              Total price: $
              {cartItems.reduce((acc, item) => acc + item.product_price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item className="text-center pt-3 pb-3">
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  ) : null;
};

export default CartScreen;
