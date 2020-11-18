import React from 'react';
import './App.css';
import Login from './modules/login/login.component';
import Register from './modules/register/register.component';
import Dashboard from './modules/dashboard/dashboard.component'
import AddProductScreen from './modules/product/addProduct.component'
// import Header from './shared/header/header.component';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <main>
      {/* <Header></Header> */}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/addproduct" component={AddProductScreen} />
        <Route path="/" component={Login} exact />
      </Switch>
    </main>
  )
}

export default App;
