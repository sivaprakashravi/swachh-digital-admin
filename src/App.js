import React from 'react';
import './App.css';
import Login from './modules/login/login.component';
import Register from './modules/register/register.component';
import Dashboard from './modules/dashboard/dashboard.component'
import AddProductScreen from './modules/product/addProduct.component'
// import Header from './shared/header/header.component';
import {ProductListScreen} from './modules/product/productList.component'
import {EditScreen} from './modules/product/editProduct'
import { Route, Switch } from 'react-router-dom';
import StoreRegister  from './modules/register/storeRegister.component'
import CreateProduct from './modules/baseProduct/createProduct.component'
import {AuthContext} from './modules/utils/auth-context'
function App() {
const [state,dispatch] = React.useReducer(
  (prevState,action)=>{
switch(action.type){
  
}
  },
  {
    isLoading: false,
    isSignOut: false,
    userToken: null,
    user: {},
    error: null,
  },
);

React.useEffect(() => {
  // Fetch the token from storage then navigate to our appropriate place
  const bootstrapAsync = async () => {
    try {
      const userJson = await localStorage.getItem('userToken');
      if (userJson) {
        const {idToken,email,localId} = JSON.parse(userJson);
        dispatch({type: 'RESTORE_TOKEN', idToken, email,localId});
      }
    } catch (e) {
      // Restoring token failed
      console.log(e);
    }
  };
  bootstrapAsync();
}, []);


const authContext = React.useMemo(
  ()=>({
      signIn: async (data)=>{
        try {
          
        } catch (error) {
          
        }
      },
      signOut: async ()=>{

      },
      signUp: async ()=>{
        try {
          
        } catch (error) {
          
        }
      } 
  }),
  []
)
  return (
    <main>
      {/* <Header></Header> */}
      <AuthContext.Provider value={{...authContext,...state}}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/addproduct" component={AddProductScreen} />
        <Route path="/productlist" component={ProductListScreen} />
        <Route path="/editScreen" component={EditScreen} />
        <Route path="/storeRegister" component={StoreRegister} />
        <Route path="/createProduct" component={CreateProduct} />
        <Route path="/" component={Login} exact />
      </Switch>
      </AuthContext.Provider>
    </main>
  )
}

export default App;
