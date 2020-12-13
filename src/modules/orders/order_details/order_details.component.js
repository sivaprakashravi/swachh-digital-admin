import React from 'react';
import '../order_screen.style.scss';

export const OrderDetails = (props) => {
    const data = props.location.state
    return (
        <div className="order-details">
            <div className="row-view">
                <text style={{ float: 'left', width: '50%', color: 'orange' }}>#{data.id}<br />
                    <text style={{ fontSize: 12, color: 'gray' }}>{data.date}</text></text>
                <text style={{ float: 'right', width: '50%', color: 'green' }}>Status : <text>{data.status}</text></text>
            </div>
            <div className="details-view">
                <ul>
                    <li>
                        <text>Customer Name : {data.customer_name}</text>
                    </li>
                    <li>
                        <text>Customer Mobile : {data.customer_phone}</text>
                    </li>
                    <li>
                        <text>Email : {data.email}</text>
                    </li>
                    <li>
                        <text>Amount : {data.amount}</text>
                    </li>
                    <li>
                        <text>Link : {data.tracking_link}</text>
                    </li>
                    <li>
                        <text>No.Of Items : {data.items_count}</text>
                    </li>
                    <li>
                        <text>Category : {data.category}</text>
                    </li>
                    <li>
                        <text>Payment Through : {data.paymentType}</text>
                    </li>
                </ul>
            </div>
            <div className="button-view">
                <button className="primary">Accept</button>
                <button className="primary">Reject</button>
            </div>
        </div>
    )
}