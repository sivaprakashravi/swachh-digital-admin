import React from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import Register from './modules/register/register.component';
import Login from './modules/login/login.component';
 import Dashboard from './modules/dashboard/dashboard.component'
import AddProductScreen from './modules/product/addProduct.component'
// import Header from './shared/header/header.component';
import {ProductListScreen} from './modules/product/productList.component'
import {EditScreen} from './modules/product/editProduct';
import StoreRegister  from './modules/register/storeRegister.component'
import CreateProduct from './modules/baseProduct/createProduct.component'
import {AuthContext} from './modules/utils/auth-context'
import fetchApi from './services/fetchsvc'
function App() {
const [state,dispatch] = React.useReducer(
  (prevState,action)=>{
    console.log(action.store)
switch(action.type){
  
  case 'SING_IN_SUCCESS':
          return {
            ...prevState,
            isLoading: false,
            userToken: action.dataApi.idToken,
            ids:action.dataApi,
            user: action.store,        
          }
}
  },
  {
    isLoading: false,
    isSignOut: false,
    userToken: null,
    user: {},
    ids:{},
    error: null,
  },
);


const authContext = React.useMemo(
  ()=>({
      signIn: async (values)=>{

        try {
          const data={
              "email" : values.username,
  "password" : values.password,
  "returnSecureToken" : true
          }
         const dataApi =await fetchApi.logInpost('signInWithPassword',JSON.stringify(data));
         const {idToken,email,localId} = dataApi;
         await localStorage.setItem('userToken',JSON.stringify({idToken,email,localId}));
         const user=
          {
              "UserId" : localId
          }
         const store = await fetchApi.post('api/getStoreInfo',JSON.stringify(user),idToken);
         await localStorage.setItem('storeUser',JSON.stringify(store));
         dispatch({type: 'SING_IN_SUCCESS', dataApi, store});
         
      } catch (error) {
          console.log('login',error)
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
        {
          state.userToken == null ?
          ( 
            <>
           <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Login} exact />
          </>
          )
          :
          (
            <>
             <Route path="/" component={Dashboard} exact />
              <Route path="/dashboard" component={Dashboard} /> 
        <Route path="/addproduct" component={AddProductScreen} />
        <Route path="/productlist" component={ProductListScreen} />
        <Route path="/editScreen" component={EditScreen} />
        <Route path="/storeRegister" component={StoreRegister} />
        <Route path="/createProduct" component={CreateProduct} />
            </>
          )
        }
      
      </Switch>
      </AuthContext.Provider>
    </main>
  )
}

export default withRouter(App);
