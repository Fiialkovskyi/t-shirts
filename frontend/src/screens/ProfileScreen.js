import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Accordion, Card, Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SelectedRow from '../components/SelectedRow';
import { loadOrdersHistory } from '../actions/orderActions';

const ProfileScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const orders = useSelector((state) => state.orders);
  const { ordersHistory } = orders;
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(loadOrdersHistory(userInfo.id_user));
    }
  }, [dispatch, history, userLogin]);

  const sortedOrders = ordersHistory.reduce((h, obj) => {
    h[obj.id_order] = (h[obj.id_order] || []).concat(obj);
    return h;
  }, []);

  return userInfo ? (
    <Row className="mt-5">
      <Col md={3}>
        <h2 className="text-center ">My Info:</h2>
        <ListGroup variant="flush" className="mt-2">
          <ListGroup.Item>
            <SelectedRow label={'User ID:'} value={userInfo.id_user} />
          </ListGroup.Item>
          <ListGroup.Item>
            <SelectedRow label={'Full Name:'} value={userInfo.user_full_name} />
          </ListGroup.Item>
          <ListGroup.Item>
            <SelectedRow label={'Phone Number:'} value={userInfo.user_phone_number} />
          </ListGroup.Item>
          <ListGroup.Item>
            <SelectedRow label={'Email:'} value={userInfo.user_email} />
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md="9">
        <h2 className="text-center ">Orders history:</h2>
        {ordersHistory.length ? (
          <Accordion defaultActiveKey="0">
            {sortedOrders.length &&
              sortedOrders.map((array, index) => {
                return (
                  <Card bg={'warning'} key={index}>
                    <Card.Header>
                      <Row>
                        <Col xs={11}>
                          <h2>Order#: {array[0].id_order}</h2>
                          <Row>
                            <Col xs={4}>
                              <div>Order status: </div>
                            </Col>
                            <Col xs={8}>
                              <div className="text-uppercase">{array[0].status_name}</div>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={4}>
                              <div>Address: </div>
                            </Col>
                            <Col xs={8}>
                              <div>
                                {array[0].address}, {array[0].city}, {array[0].country},{' '}
                                {array[0].zip_code}
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={4}>
                              <div>Phone# for delivery: </div>
                            </Col>
                            <Col xs={8}>
                              <div>{array[0].phone_number}</div>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={1}>
                          <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                            <i
                              className="fas fa-chevron-circle-down text-white"
                              style={{ fontSize: '30px' }}
                            ></i>
                          </Accordion.Toggle>
                        </Col>
                      </Row>
                    </Card.Header>
                    <Accordion.Collapse eventKey={index}>
                      <Card.Body className="bg-light">
                        {array.map((order, index) => {
                          return (
                            <Row key={index} className="border-bottom pb-2 mb-2">
                              <Col sm="2">
                                <Image
                                  src={order.imgUrl}
                                  alt={order.product_name}
                                  fluid
                                  rounded
                                />
                              </Col>
                              <Col sm="9">
                                <Row>
                                  <Col xs="4">Product name:</Col>
                                  <Col xs="8">{order.product_name}</Col>
                                </Row>
                                <Row>
                                  <Col xs="4">Color:</Col>
                                  <Col xs="8">{order.color_name}</Col>
                                </Row>
                                <Row>
                                  <Col xs="4">Size:</Col>
                                  <Col xs="8">{order.size_name}</Col>
                                </Row>
                                <Row>
                                  <Col xs="4">Type:</Col>
                                  <Col xs="8">{order.type_name}</Col>
                                </Row>
                                <Row>
                                  <Col xs="4">Price:</Col>
                                  <Col xs="8">${order.price}</Col>
                                </Row>
                              </Col>
                            </Row>
                          );
                        })}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                );
              })}
          </Accordion>
        ) : null}
      </Col>
    </Row>
  ) : null;
};

export default ProfileScreen;
