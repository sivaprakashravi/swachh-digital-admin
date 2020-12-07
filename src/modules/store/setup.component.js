import React from "react";
import './setup.style.scss'

export class SetupScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    handleChange(event, stateVariable) {
        this.setState({ [stateVariable]: event.target.value });
    }
inputController(){
    const {name,price,description,inventory,taxRate,shippingRate,minQty,maxQty} = this.state
    return(
        <div className="input">
    <ul>
        <li>
            <label>Product Name:</label>
            <input type="text" value={name} onChange={(e) => { this.handleChange(e, 'name') }} />
        </li>
        <li>
            <label>Price:</label>
            <input type="number" value={price} onChange={(e) => { this.handleChange(e, 'price') }} />
        </li>
        <li>
            <label>Product Description:</label>
            <input type="text" value={description} onChange={(e) => { this.handleChange(e, 'description') }} />
        </li>
        <li>
            <label>Inventory:</label>
            <input type="text" value={inventory} onChange={(e) => { this.handleChange(e, 'inventory') }} />
        </li>
        <li>
            <label>Tax rate:</label>
            <input type="text" value={taxRate} onChange={(e) => { this.handleChange(e, 'taxRate') }} />
        </li>
        <li>
            <label>shipping rate:</label>
            <input type="text" value={shippingRate} onChange={(e) => { this.handleChange(e, 'shippingRate') }} />
        </li>
        <li>
            <label>Min Order Qty:</label>
            <input type="text" value={minQty} onChange={(e) => { this.handleChange(e, 'minQty') }} />
        </li>
        <li>
            <label>Max Order Qty:</label>
            <input type="text" value={maxQty} onChange={(e) => { this.handleChange(e, 'maxQty') }} />
        </li>
</ul>
</div>
    )
}
    render(){
        return(
            <div>
{this.inputController()}
            </div>
        )
    }
}

