import React from 'react'
import './orderScreen.style.scss'
export const OrderList = (props) => {
    return (
        <div className="listContainer">
        <div className="listView" >
            <div>
                <pre>
                    <ul>
                        <li>
            <text style={{color:'#008000'}}>Product Name : {props.data.product_name}</text><br/>
            </li>
            <li>
                <text  >Category :{props.data.category}</text><br />
                </li>
                <li>
                <text >Price  : {props.data.amount}</text><br />
                </li>
                <li>
                <text >Payment  : {props.data.paymentType}</text><br />
                </li>
                <li>
                <text >ID  : {props.data.id}</text><br />
                </li>
                </ul>
                </pre>
            </div>
        </div>
        <div style={{marginLeft:80}}>
            <button className="button"  onClick={() => props.nav.push({ pathname: 'orderDetails',state:props.data })}>View</button>
            <button className="button"  onClick={() => props.nav.push({pathname:'orderEdit',state:props.data})}>Edit</button>
            </div>
        </div>
    )
}