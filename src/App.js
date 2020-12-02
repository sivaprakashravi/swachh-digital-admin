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
import {OrderScreen} from './modules/orders/orderScreen.component'
import {OrderDetails} from './modules/orders/orderDetails.component'
import { OrderEditScreen } from "./modules/orders/orderEdit.component";
import {AuthContext} from './modules/utils/auth-context'
import fetchApi from './services/fetchsvc'
function App() {
const [state,dispatch] = React.useReducer(
  (prevState,action)=>{
    console.log(action.store)
switch(action.type){
  case 'SING_IN':
    return {
      ...prevState,
      isLoading: true,       
    }
    case 'SING_IN_ERROR':
    return {
      ...prevState,
      isLoading: false,       
    }
  case 'SING_IN_SUCCESS':
          return {
            ...prevState,
            isLoading: false,
            userToken: action.dataApi.idToken,
            ids:action.dataApi,
            user: action.store,        
          }
          case 'REFRESH_TOKEN':
            return{
              ...prevState,
              isLoading: false,
              userToken: action?.userId?.idToken??null,
              ids:action?.userId??null,
              user: action?.store??null, 
            }
            case 'SIGN_OUT':
              return{
                ...prevState,
                isLoading: false,
                userToken: null,
                ids: null,
                user: null, 
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

const reFresh=async ()=>{
  try {
    const storeParse = await localStorage.getItem('storeUser');
    const userParse = await localStorage.getItem('userToken');
    const store = JSON.parse(storeParse);
    const userId = JSON.parse(userParse);
    dispatch({type:'REFRESH_TOKEN',userId,store})
   } catch (error) {
     console.log(error)
   }
}
React.useEffect(()=>{
 reFresh()
},[])

const authContext = React.useMemo(
  ()=>({
      signIn: async (values)=>{

        try {
          dispatch({type: 'SING_IN'});
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
        dispatch({type: 'SING_IN_ERROR'});
          console.log('login',error)
          alert(error)
      }

      },
      signOut: async ()=>{
try {
  localStorage.removeItem('userToken');
  localStorage.removeItem('storeUser');
  dispatch({type:'SIGN_OUT'})
} catch (error) {
  console.log(error)
}
      },
      signUp: async ()=>{
        try {
          
        } catch (error) {
          
        }
      } 
  }),
  []
)


if(state.isLoading){
    return(
        <div className="center">
    <div className="loader"></div>
    </div>
    )
}
console.log( state.userToken)
  return (
    <main>
      {/* <Header></Header> */}
      <AuthContext.Provider value={{...authContext,...state}}>
      <Switch>
        {
          state.userToken === null ?
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
        <Route path="/orderDetails" component={OrderDetails} />
        <Route path="/orderlist" component={OrderScreen} />
        <Route path="/editScreen" component={EditScreen} />
        <Route path="/storeRegister" component={StoreRegister} />
        <Route path="/createProduct" component={CreateProduct} />
        <Route path="/orderEdit" component={OrderEditScreen} />
            </>
          )
        }
      
      </Switch>
      </AuthContext.Provider>
    </main>
  )
}

export default App;
