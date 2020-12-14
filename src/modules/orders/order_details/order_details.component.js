import React from 'react';
import '../order_screen.style.scss';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { FcCheckmark, FcCancel, FcShop, FcFeedIn, FcShipped, FcCallback, FcButtingIn, FcMoneyTransfer } from 'react-icons/fc';
import { FaPhoneAlt, FaRupeeSign } from 'react-icons/fa';
import * as moment from 'moment';
import { useState } from 'react';

export const OrderDetails = (props) => {
    const [isShowDetails, setShowDetails] = useState(false);
    const toggle = React.useCallback(() => setShowDetails(!isShowDetails));
    const data = props.location.state;
    return (
        <div className="order">
            <div className="sub-header">
                <RiArrowGoBackLine onClick={props.history.goBack} className="icon" size="22px" />
                <label>Order Details - {data.id} </label><span>{moment().format('L')}</span>
            </div>
            <div className="details">
                <ul className="status">
                    {/* <li><div><FcCheckmark size="35px" /></div></li>
                    <li><div><FcShop size="35px" /></div></li>
                    <li><div><FcFeedIn size="35px" /></div></li> */}
                    <li>
                        <FcShipped size="100px" />
                        <label>Shipped</label></li>
                </ul>
                <div className="customer" onClick={toggle}>
                    <div><FcButtingIn size="50px" /></div>
                    <div>{data.customer_name} <label>{data.customer_phone}</label></div>
                    <FaPhoneAlt className="call" color="green" size="20px" />
                    <FcMoneyTransfer className="call" size="20px" />
                </div>
                {isShowDetails ?
                    <ul className="by">
                        <li>{data.items_count} Item for <FaRupeeSign /> {data.amount}</li>
                    </ul> : null}
            </div>
            <div className="actions">
                <li><button><FcCheckmark /><label>Accept</label></button></li>
                <li><button><FcCancel /><label>Reject</label></button></li>
            </div>
        </div>
    )
}