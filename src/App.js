import React from 'react';
import './App.css';
import Login from './modules/login/login.component';
import Register from './modules/register/register.component';
// import Header from './shared/header/header.component';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <main>
      {/* <Header></Header> */}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Login} exact />
      </Switch>
    </main>
  )
}

export default App;
