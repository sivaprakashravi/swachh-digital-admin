import React from 'react';
import '../order_screen.style.scss';
import { VMenu } from '../../../components/menu/menu.component';
import { FcShipped } from 'react-icons/fc';
import { IoIosArrowForward } from 'react-icons/io';
import { BiEdit } from 'react-icons/bi';
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
                    <li><FcShipped className="shipped" size="22px" /> <label>ID: {props.data.id}</label> <BiEdit className="edit" size="22px" /></li>
                    <li>Amount: {props.data.amount}</li>
                    <li>Customer: {props.data.customer_name}</li>
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