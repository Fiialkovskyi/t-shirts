import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from '../actions/productActions';

const CategoriesScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1 className="mt-4">Categories: </h1>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">All products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Auto</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">IT</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">Internet memes</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fifth">Music</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sixth">Holidays</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="seventh">Humor</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Row>
                  {products.map((product) => (
                    <Col key={product.id_product} sm={12} md={6} lg={4} className="my-3">
                      <Product product={product} />
                    </Col>
                  ))}
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Row>
                  {products
                    .filter((item) => item.id_category === 1)
                    .map((product) => (
                      <Col
                        key={product.id_product}
                        sm={12}
                        md={6}
                        lg={4}
                        className="my-3"
                      >
                        <Product product={product} />
                      </Col>
                    ))}
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <Row>
                  {products
                    .filter((item) => item.id_category === 2)
                    .map((product) => (
                      <Col
                        key={product.id_product}
                        sm={12}
                        md={6}
                        lg={4}
                        className="my-3"
                      >
                        <Product product={product} />
                      </Col>
                    ))}
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
                <Row>
                  {products
                    .filter((item) => item.id_category === 3)
                    .map((product) => (
                      <Col
                        key={product.id_product}
                        sm={12}
                        md={6}
                        lg={4}
                        className="my-3"
                      >
                        <Product product={product} />
                      </Col>
                    ))}
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="fifth">
                <Row>
                  {products
                    .filter((item) => item.id_category === 4)
                    .map((product) => (
                      <Col
                        key={product.id_product}
                        sm={12}
                        md={6}
                        lg={4}
                        className="my-3"
                      >
                        <Product product={product} />
                      </Col>
                    ))}
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="sixth">
                <Row>
                  {products
                    .filter((item) => item.id_category === 5)
                    .map((product) => (
                      <Col
                        key={product.id_product}
                        sm={12}
                        md={6}
                        lg={4}
                        className="my-3"
                      >
                        <Product product={product} />
                      </Col>
                    ))}
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="seventh">
                <Row>
                  {products
                    .filter((item) => item.id_category === 6)
                    .map((product) => (
                      <Col
                        key={product.id_product}
                        sm={12}
                        md={6}
                        lg={4}
                        className="my-3"
                      >
                        <Product product={product} />
                      </Col>
                    ))}
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default CategoriesScreen;
