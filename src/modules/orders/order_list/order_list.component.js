import React from 'react';
import '../order_screen.style.scss';
import { VMenu } from '../../../components/menu/menu.component';
export const OrderList = (props) => {
    return (
        <div className="order-list">
            <div className="menu">
                <VMenu style={{ marginLeft: 50 }} >
                    <li
                        onClick={() => props.nav.push({ pathname: 'orderDetails', state: props.data })}> View
        </li>
                    <li onClick={() => props.nav.push({ pathname: 'orderEdit', state: props.data })}>Edit</li>
                </VMenu>
            </div>
            <div className="list-view">
                <ul>
                    <li>ID : {props.data.id}</li>
                    <li>Amount :{props.data.amount}</li>
                    <li>Customer  : {props.data.customer_name}</li>
                    <li>shipping status  : {props.data.status}</li>
                </ul>
            </div>
            <div style={{}}>
                <button className="button" onClick={() => { }}>Accept</button>
                <button className="button" onClick={() => { }}>Reject</button>
            </div>

        </div>
    )
}