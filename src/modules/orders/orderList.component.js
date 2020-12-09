import React from 'react';
import './orderScreen.style.scss';
import { VMenu } from '../../components/menu.component'
export const OrderList = (props) => {
    return (
        <div className="orderlistContainer">
            <div className="menu">
                <VMenu style={{ marginLeft: 50 }} >
                    <li
                        onClick={() => props.nav.push({ pathname: 'orderDetails', state: props.data })}> View
        </li>
                    <li onClick={() => props.nav.push({ pathname: 'orderEdit', state: props.data })}>Edit</li>
                </VMenu>
            </div>
            <div className="listView" >
                <div>
                    <pre>
                        <ul>
                            <li>
                                <text style={{ color: '#008000' }}>Product Name : {props.data.product_name}</text><br />
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
            <div style={{}}>
                <button className="button" onClick={() => { }}>Accept</button>
                <button className="button" onClick={() => { }}>Reject</button>
            </div>

        </div>
    )
}