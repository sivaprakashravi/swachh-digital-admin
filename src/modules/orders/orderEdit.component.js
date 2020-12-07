import React from 'react'
import '../product/addProduct.style.scss'
import Switch from "react-switch";
export class OrderEditScreen extends React.Component {
    fileObj = [];
    fileArray = []
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            subCategories:[],
            image: null,
            file: null,
         active: true,
         offerTog:false 
        }
        
      }
     
   


    componentDidMount() {
       const {id,customer_name,amount,paymentType,paymentStatus,product_name,category,
        items_count,invoice,email,tracking_link,customer_phone,
    } = this.props.location.state;
    this.setState({id:id,customerName:customer_name,mobile:customer_phone,name:product_name,link:tracking_link
    ,invoice:invoice,price:amount,items:items_count,email:email})
    }

    
    handleChange(event, stateVariable) {
        this.setState({ [stateVariable]: event.target.value });
    }
   
    categoryControl(){
        return(
        <ul>
        <div className="input">
            <label for="status">Choose a Payment status:</label>
        </div>
        <select id="status" name="status" onChange={(e) => this.handleChange(e, 'status')} className="dropDown">
        <option >Pending</option>
        <option >Processing</option>
        <option>Credited</option>
        </select><br/>
        <div className="input">
            <label for="type">Choose a Payment type:</label>
        </div>
        <select id="type" name="type" onChange={(e) => this.handleChange(e, 'type')} className="dropDown">
        <option >COD</option>
        <option >Online</option>
        </select>
    </ul>
        )
    }
    

        inputController(){
            const { name, id,price, link, customerName,mobile,items,email,invoice } = this.state;
 return(
    <div className="input">
    <ul>
    <li>
            <label>Order ID:</label>
            <input type="text" value={id} onChange={(e) => { this.handleChange(e, 'id') }} readOnly={true}/>
        </li>
        <li>
            <label>tracking Link:</label>
            <input type="text" value={link} onChange={(e) => { this.handleChange(e, 'link') }} />
        </li>
        <li>
            <label>Customer Name:</label>
            <input type="text" value={customerName} onChange={(e) => { this.handleChange(e, 'customerName') }} />
        </li>
        <li>
            <label>Customer Mobile:</label>
            <input type="text" value={mobile} onChange={(e) => { this.handleChange(e, 'mobile') }} />
        </li>
        <li>
            <label>Product Name:</label>
            <input type="text" value={name} onChange={(e) => { this.handleChange(e, 'name') }} readOnly={true}/>
        </li>
        <li>
            <label>Price:</label>
            <input type="number" value={price} onChange={(e) => { this.handleChange(e, 'price') }} readOnly={true}/>
        </li>
        <li>
            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => { this.handleChange(e, 'email') }} readOnly={true}/>
        </li>
        <li>
            <label>No.Of Items:</label>
            <input type="text" value={items} onChange={(e) => { this.handleChange(e, 'items') }} readOnly={true}/>
        </li>
        <li>
            <label>Invoice:</label>
            <input type="text" value={invoice} onChange={(e) => { this.handleChange(e, 'invoice') }} readOnly={true}/>
        </li>
      
</ul>
</div>
 )    
        }

    render() {
               return (
            <div>
                {this.categoryControl()}
                {this.inputController()}
               
                 <div className="input">
                 <ul>
                    <li><button className="primary" onClick={() => {}}>Save</button></li>
                    </ul>
                    </div>
            </div>
        )
    }
}