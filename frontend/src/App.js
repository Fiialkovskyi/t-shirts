import Header from './components/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className="App">
          <Container>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/product/:id" component={ProductScreen} />
          </Container>
        </main>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
