import React from 'react';
import '../order_screen.style.scss';
import { FcShipped } from 'react-icons/fc';
import { IoIosArrowForward } from 'react-icons/io';
import { BiEdit } from 'react-icons/bi';
export const OrderList = (props) => {
    return (
        <div className="order-list">
            <div className="list-view">
                <ul>
                    <li><FcShipped className="shipped" size="22px" /> <label>ID: {props.data.Id}</label> <BiEdit className="edit" size="22px" onClick={() => props.nav.push({ pathname: 'orderEdit', state: props.data })} /></li>
                    <li>Amount: {props.data.TotalAmount}</li>
                    <li>Customer: {props.data.CustomerPhone}</li>
                </ul>
            </div>
            <div className="actions">
                <button className="accept" onClick={() => { }}>Accept</button>
                <button className="reject" onClick={() => { }}>Reject</button>
            </div>
            <div className="view" onClick={() => props.nav.push({ pathname: 'orderDetails', state: props.data })}><IoIosArrowForward size="24px" /></div>
        </div>
    )
}