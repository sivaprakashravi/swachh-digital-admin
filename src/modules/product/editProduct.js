import React from 'react'
import './addProduct.style.scss'

export class EditScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    handleChange(event, stateVariable) {
        this.setState({ [stateVariable]: event.target.value });
    }
    render(){
   const {state,callBack} = this.props.location;

    return(
        <div className="input">
        <ul>
                <li>
                    <label>Product Name:</label>
                    <input type="text" value={state.ProductName} onChange={(e) => { this.handleChange(e, 'name') }} />
                </li>
                <li>
                    <label>Price:</label>
                    <input type="text" value={state.RetailPrice} onChange={(e) => { this.handleChange(e, 'price') }} />
                </li>
                <li>
                    <label>Discount:</label>
                    <input type="text" value={state.Offer_Price}  onChange={(e) => { this.handleChange(e, 'discount') }}/>
                </li>
                <li>
                    <label>Category:</label>
                    <input type="text" value={state.Category}  onChange={(e) => { this.handleChange(e, 'category') }}/>
                </li>
                <input type="file"  />
                <li><button className="primary" onClick={()=>callBack(this.state.name,this.state.price,this.state.discount,this.state.category)}>Save</button></li> 
            </ul>
            </div>
    )
}
}