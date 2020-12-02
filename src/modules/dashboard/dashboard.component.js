import React from 'react'
import './dashboard.style.scss'
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
}


  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };



buttonControls(){
  const {signOut}= this.context;
    return(
        <div className="buttonView">
<button className="primary" style={{margin:10}} onClick={()=>this.props.history.push('createProduct')}>Add Products</button>
<button className="primary" style={{margin:10}} onClick={()=>this.props.history.push('productlist')}>Product List</button>
<button className="primary" style={{margin:10}}>Access Management</button>
<button className="primary" style={{margin:10}} onClick={()=>this.props.history.push('orderlist')}>Orders</button>
<button className="primary" style={{margin:10}}>Customers</button>
<button className="primary" style={{margin:10}}>Store Setup</button>
<button className="primary" style={{margin:10}}>Reports</button>
<button className="primary" style={{margin:10}}>Store Design</button>
<button className="primary" style={{margin:10}} onClick={()=>signOut()}>Log Out</button>
        </div>
    )
}
    render(){
      const user = this?.context?.user ?? {};
        return(
<div >
<div className="greet">
        <h2>Hi,{user.StoreName}</h2>
<h6 className="urlView">{user.StoreLink}</h6>
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