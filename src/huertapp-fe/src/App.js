import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

//Redux
import { Provider } from 'react-redux';
import Store from './store';

//Components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

const App = () => {
  return (
    <Provider store={Store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
