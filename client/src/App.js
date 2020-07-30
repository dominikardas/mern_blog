/* Core */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

/* Redux */
import { Provider } from 'react-redux';
import store from './store';

/* Styles */
import './App.scss';

/* Components */
import Header from './components/layouts/Header';
import Homepage from './components/pages/Homepage';
import Category from './components/pages/Category';
import Post from './components/pages/posts/Post';
import About from './components/pages/About';

import Login from './components/pages/users/Login';
import Register from './components/pages/users/Register';

import Designer from './components/pages/posts/Designer';

import AdminPanel from './components/pages/users/admin/AdminPanel';

/* Authentication */
import { loadUser } from './actions/authActions';

class App extends React.Component {

  componentDidMount() {
    store.dispatch(loadUser());

    // document.title = 'Homepage - MERN Blog';
  }

  render() {

    return (
    <Provider store={store}>
    <Router>

      <div className="c-container">

        { /* Header on all pages */ }
        <Header />

        { /* Homepage */ }
        <Route exact path="/" component= { Homepage } />

        { /* Category */ }
        <Route path="/category/:categoryName" component={ Category } />

        { /* Post */ }
        <Route path="/post/:slug" component={ Post } />

        { /* Login Page */ }
        <Route exact path="/users/login" component={ Login }  />

        { /* Register Page */ }
        <Route exact path="/users/register" component={ Register } />

        { /* Designer Page */ }
        <Route exact path="/designer" component={ Designer } />

        { /* Admin Panel Page */ }
        <Route path="/admin" component={ AdminPanel } />
        <Route path="/posts/id/:id" component={ Post } />

        <Route path="/about" component={ About } />

      </div>
    </Router>
    </Provider>
    );
  }
}

export default App;
