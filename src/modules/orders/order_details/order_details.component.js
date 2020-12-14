import React from 'react';
import '../order_screen.style.scss';

export const OrderDetails = (props) => {
    const data = props.location.state
    return (
        <div className="order-details">
            <div className="row-view">
                <div>
                <text style={{ float: 'left', width: '50%', color: 'orange',fontSize:12 }}>#{data.OrderId}</text><br />
                    <text style={{ fontSize: 12, color: 'gray' }}>{data.InvoiceDate}</text>
                    </div>
                <text style={{ float: 'right', width: '50%', color: 'green' }}>Status : <text>{data.OrderStatus}</text></text>
            </div>
            <div className="details-view">
                <ul>
                    <li>
                        <text>Customer Name : {data.customer_name}</text>
                    </li>
                    <li>
                        <text>Customer Mobile : {data.CustomerPhone}</text>
                    </li>
                    <li>
                        <text>Email : {data.CustomerEmail}</text>
                    </li>
                    <li>
                        <text>Amount : {data.TotalAmount}</text>
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
                        <text>Payment Through : {data.ModeDelivery}</text>
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