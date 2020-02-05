import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Contact from './containers/Checkout/Contact/Contact';
import Orders from './containers/Orders/Orders';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/contact' component={Contact} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/' component={BurgerBuilder} />
        </Switch>
      </Layout>
    </BrowserRouter>
    
  );
}

export default App;
