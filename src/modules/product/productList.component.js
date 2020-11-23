import React from 'react'
import List from   './List.json'
import {Listview} from './listView'
import fetchservices from '../../services/fetchsvc'
export class ProductListScreen extends React.Component{
    constructor(props){
        super(props);
    this.state={
        list:[]
    }
    }

   async  getProducts(){
   try {
    const store= await localStorage.getItem('storeUser');
    const userId = await localStorage.getItem('userToken');
    const {email,localId,idToken} = JSON.parse(userId);
    const {StoreId} = JSON.parse(store);
    const data = await fetchservices.get(`api/getProducts/${StoreId}`,idToken);
    this.setState({list:data})  
   } catch (error) {
       console.log(error)
   }
    }
    componentDidMount(){
        this.getProducts();
    }

   async editProduct(name,price,discount,category){
       try {
        const store= await localStorage.getItem('storeUser');
        const userId = await localStorage.getItem('userToken');
        const {email,localId,idToken} = JSON.parse(userId);
        const {StoreId} = JSON.parse(store);
        const data={
            "DocId" : "",
    "Brands" : "",
    "Category" : "soap",
    "SubCategory" : "",
    "ImageUrl" : "",
    "IsActive" : true,
    "IsOffer"  : false,
    "ProductCode" : "",
    "ProductName" : "vmc",
    "ProductDesc" : "",
    "RetailPrice" : price,
"Offer_Price" : 0,
    "StoreId" : StoreId,    
    "ModifiedBy" : localId
        } 
const editApi = await fetchservices.post('api/updateProduct',JSON.stringify(data),idToken);
console.log("edit screen api",editApi);

       } catch (error) {
           console.log(error);
       }
    }

    render(){
        let list=this.state.list.map((x,index)=>{return(
<Listview data={x} key={index} nav={this.props.history} edit={this.editProduct}/>
        )})
        return(
            <div>
                {list}
            </div>
        )
    }
}