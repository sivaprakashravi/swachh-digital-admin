import React from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import Register from './modules/register/register.component';
import Login from './modules/login/login.component';
import Dashboard from './modules/dashboard/dashboard.component';
import Header from './shared/header/header.component';
import BottomNav from './shared/bottom-navigation/bottom-navigation.component';

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
      {showHeader(e.location.pathname) ? <Header />: null}
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Login} exact />
      </Switch>
      {showHeader(e.location.pathname) ? <BottomNav />: null}
    </main>
  )
}

export default withRouter(App);
