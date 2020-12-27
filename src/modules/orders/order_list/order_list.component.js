import React from 'react';
import '../order_screen.style.scss';
import { FcShipped } from 'react-icons/fc';
import { IoIosArrowForward } from 'react-icons/io';
import { BiEdit } from 'react-icons/bi';
import t from '../../../locale/translate'
export const OrderList = (props) => {
    return (
        <div className="order-list">
            <div className="list-view">
                <ul>
                    <li><FcShipped className="shipped" size="22px" /> <label>{t('ORDERID')}: {props.data.OrderId}</label> <BiEdit className="edit" size="22px" onClick={() => props.nav.push({ pathname: 'orderEdit', state: props.data })} /></li>
                    <li>{t('AMOUNT')}: {props.data.TotalAmount}</li>
                    <li>{t('CUSTOMER')}: {props.data.CustomerPhone}</li>
                </ul>
            </div>
            {
                props.data.OrderStatus === 'New' &&
                <div className="actions">
                <button className="accept" onClick={() => props.update(props.data.Id,'Accept','')}>{t('ACCEPT')}</button>
                <button className="reject" onClick={() => props.update(props.data.Id,'Reject','')}>{t('REJECT')}</button>
            </div>
            }
           
            <div className="view" onClick={() => props.nav.push({ pathname: 'orderDetails', state: props.data,callBack : props.update })}><IoIosArrowForward size="24px" /></div>
        </div>
    )
}