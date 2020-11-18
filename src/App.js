import React from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import Register from './modules/register/register.component';
import Login from './modules/login/login.component';
import Dashboard from './modules/dashboard/dashboard.component';
import Header from './shared/header/header.component';

function showHeader(route) {
  const noAuth = ['', 'login', 'register'];
  const has = noAuth.filter(auth => {
    return route === `/${auth}`;
  });
  return (has && has.length) ? false : true;
}

function App(e) {
  return (
    <main>
      {showHeader(e.location.pathname) ? <Header></Header>: null}
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Login} exact />
      </Switch>
    </main>
  )
}

export default withRouter(App);
