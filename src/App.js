import React from 'react';
import './App.css';
import Login from './modules/login/login.component';
import Register from './modules/register/register.component';
import Dashboard from './modules/dashboard/dashboard.component'
import AddProductScreen from './modules/product/addProduct.component'
import Header from './shared/header/header.component';
import BottomNav from './shared/bottom-navigation/bottom-navigation.component';
import { ProductListScreen } from './modules/product/productList.component'
import { EditScreen } from './modules/product/editProduct'
import { Route, Switch, withRouter } from 'react-router-dom';
import StoreRegister from './modules/register/storeRegister.component'
import CreateProduct from './modules/baseProduct/createProduct.component'
import { OrderScreen } from './modules/orders/orderScreen.component'
import { OrderDetails } from './modules/orders/orderDetails.component'
import { OrderEditScreen } from "./modules/orders/orderEdit.component";
import { AuthContext } from './modules/utils/auth-context'
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
      <AuthContext.Provider>
        {showHeader(e.location.pathname) ? <Header /> : null}
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/addproduct" component={AddProductScreen} />
          <Route path="/productlist" component={ProductListScreen} />
          <Route path="/orderDetails" component={OrderDetails} />
          <Route path="/orderlist" component={OrderScreen} />
          <Route path="/editScreen" component={EditScreen} />
          <Route path="/storeRegister" component={StoreRegister} />
          <Route path="/createProduct" component={CreateProduct} />
          <Route path="/orderEdit" component={OrderEditScreen} />
        </Switch>
        {showHeader(e.location.pathname) ? <BottomNav /> : null}
      </AuthContext.Provider>
    </main>
  )
}


export default withRouter(App);
