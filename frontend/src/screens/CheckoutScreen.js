import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addNewOrder } from '../actions/orderActions';
import { clearCart } from '../actions/cartActions';
import Message from '../components/Message';

const CheckoutScreen = ({ location, history }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [shippingCarrier, setShippingCarrier] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [isOrderPleced, setIsOrderPleaced] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const orders = useSelector((state) => state.orders);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  const date = new Date().toISOString().slice(0, 10);

  const submitOrder = (e) => {
    e.preventDefault();
    if (address && city && country && postalCode && phone && cartItems.length) {
      const itemsForDB = cartItems.map((item) => {
        return {
          id_option: item.id_option,
          price: item.product_price,
        };
      });

      dispatch(
        addNewOrder({
          id_user: userInfo.id_user,
          id_order_status: 1,
          id_payment: paymentMethod,
          id_shipping_method: shippingCarrier,
          address: address,
          city: city,
          country: country,
          zip_code: postalCode,
          phone_number: phone,
          order_date: date,
          orderItems: itemsForDB,
        })
      );
      dispatch(clearCart(userInfo.id_user));
      setIsOrderPleaced(true);
    } else {
      setIsValid(false);
    }
  };

  return cartItems.length ? (
    <Container>
      <Row className="mt-3">
        <Col sm={6}>
          <h2 className="mt-5">Order details</h2>
          <Col md={10}>
            <ListGroup variant="flush" className="mt-4">
              {cartItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col sm={3} md={2}>
                      <Image src={item.imgUrl} alt={item.product_name} fluid rounded />
                    </Col>
                    <Col>
                      <Link
                        to={`/product/${item.id_product}`}
                        style={{ fontSize: '20px' }}
                      >
                        {item.product_name}
                      </Link>
                      <Row>
                        <Col xs={4}>
                          <div>Type: </div>
                        </Col>
                        <Col xs={8}>
                          <div>{item.type_name}</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={4}>
                          <div>Size: </div>
                        </Col>
                        <Col xs={8}>
                          <div>{item.size_name}</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={4}>
                          <div>Color: </div>
                        </Col>
                        <Col xs={8}>
                          <div>{item.color_name}</div>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={2} style={{ fontSize: '20px' }}>
                      ${item.product_price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <h3 className="mt-4 text-right">
              Total: $
              {cartItems.reduce((acc, item) => acc + item.product_price, 0).toFixed(2)}
            </h3>
          </Col>
        </Col>
        <Col sm={6}>
          <Row className="justify-content-md-center">
            <Col>
              <h2 className="mt-5">Checkout</h2>
              <Form onSubmit={(e) => submitOrder(e)}>
                <Form.Group controlId="address" className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="city" className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="postalCode" className="mb-3">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter postal code"
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="country" className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter country"
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="phone" className="mb-3">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={phone}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <h4>Shipping carrier:</h4>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  required
                  onChange={(e) => setShippingCarrier(e.target.value)}
                >
                  <option defaultValue value="1">
                    Nova Poshta - Free shipping
                  </option>
                  <option disabled value="3">
                    Justin - not availabe
                  </option>
                </select>
                <h4 className="mt-3">Payment method:</h4>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  required
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option defaultValue value="1">
                    Cash on delivery
                  </option>
                </select>

                <Button
                  type="submit"
                  variant="primary"
                  className="d-block mx-auto mt-3 mb-5"
                  onClick={(e) => submitOrder(e)}
                >
                  Continue
                </Button>
                {!isValid ? (
                  <Message variant="danger">Please fill the form</Message>
                ) : null}
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : isOrderPleced ? (
    <div className="text-center m-5">
      <h1 className="m-5">Thank You!</h1>
      <h2>Order# {orders.lastOrder} has been placed</h2>
      <Link to="/">To Home Page</Link>
    </div>
  ) : null;
};

export default CheckoutScreen;
