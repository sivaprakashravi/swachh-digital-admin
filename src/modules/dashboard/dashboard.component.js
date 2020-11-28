import React from 'react'
import './dashboard.style.scss'
 
import register from '../../services/fetchsvc'
import {AuthContext} from '../utils/auth-context'
class DashboardScreen extends React.Component{
  static contextType = AuthContext
  fileObj = [];
  fileArray = [];
constructor(props){
    super(props);
    this.state={
        url:'http://something.com',
        showModal: false,
        category:'New Category',
        selectCategory:'',
        file:[null]
    };
 
 
}

componentDidMount(){
  const user = this?.context?.user ?? {};
  console.log("dashboard",user)
}
// componentDidMount(){
//   const store=  localStorage.getItem('storeUser');
//         const userId =  localStorage.getItem('userToken');
//         const {email,localId,idToken} = JSON.parse(userId);
//         const {StoreId} = JSON.parse(store);
//         const list = JSON.stringify({"DocId":"fw8vPFx3P9V98Zj93czp", "Brands" : "",
//         "Category" : "soap",
//         "SubCategory" : "",
//         "ImageUrl" : "",
//         "IsActive" : true,
//         "IsOffer"  : false,
//         "ProductCode" : "",
//         "ProductName" : "vmc",
//         "ProductDesc" : "",
//         "RetailPrice" : "20",
//     "Offer_Price" : 0,"StoreId":"swac2137","ModifiedBy":"J5hmruEoY6TMoLGTXiQ8ZLKWnqk1"})
//   const data = register.post('api/updateProduct',list,idToken)
// }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };



buttonControls(){
    return(
        <div className="buttonView">
<button className="primary" style={{margin:10}} onClick={()=>this.props.history.push('createProduct')}>Add Products</button>
<button className="primary" style={{margin:10}} onClick={()=>this.props.history.push('productlist')}>Product List</button>
<button className="primary" style={{margin:10}}>Access Management</button>
<button className="primary" style={{margin:10}}>Orders</button>
<button className="primary" style={{margin:10}}>Customers</button>
<button className="primary" style={{margin:10}}>Store Setup</button>
<button className="primary" style={{margin:10}}>Reports</button>
<button className="primary" style={{margin:10}}>Store Design</button>

        </div>
    )
}
    render(){
        return(
<div >
<div className="greet">
<h2>Store Name</h2>
<h6 className="urlView">{this.state.url}</h6>
</div>
<div className="storeBlock">
<p>Payment setup</p><br/>
<p>store details and terms an d conditions</p><br/>
<p>store theme</p><br/>
<p>++include steps</p><br/>
</div>
{this.buttonControls()}
</div>
        )
    }
}

export default DashboardScreen;