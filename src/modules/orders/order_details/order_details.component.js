import React from 'react';
import '../order_screen.style.scss';
import fetchservices from '../../../services/fetchsvc.service'
import { RiArrowGoBackLine } from 'react-icons/ri';
import { FcCheckmark, FcCancel, FcShop, FcFeedIn, FcShipped, FcCallback, FcButtingIn, FcMoneyTransfer } from 'react-icons/fc';
import { FaPhoneAlt, FaRupeeSign } from 'react-icons/fa';
import * as moment from 'moment';
import { useState } from 'react';
import OrderProducts from './order_products.component';
import translate from '../../../locale/translate'
export const OrderDetails = (props) => {
    const [isShowDetails, setShowDetails] = useState(false);
    const [reason, setReason] = useState('');
    const [products, setProducts] = useState([]);
    const toggle = React.useCallback(() => setShowDetails(!isShowDetails));
    const data = props.location.state;
    const { callBack } = props.location;
    const itemList = async () => {
        const items = await fetchservices.get(`api/getOrdersbyId/${data.Id}`);
        setProducts(items);
    }
    React.useEffect(() => {
        itemList();
    }, [data]);
    if(!data){
        return null;
    };
    return (
        <div className="order">
            {/* <div className="reject-modal">
            <ul>
                <li>
                    <label>Reason for reject</label>
                    <input type="text"/>
                </li>
                <li>
                    <button className="primary">Reject</button>
                </li>
            </ul>
            </div> */}
            <div className="sub-header">
                <RiArrowGoBackLine onClick={props.history.goBack} className="icon" size="22px" />
                <label>{translate('ORDERDETAILS')}</label>
            </div>
            <div className="details">
                <div className="order-id">
                <label>{translate('ORDERID')} - {data.OrderId}</label>
                <span>{moment(data.InvoiceDate).format('L')}</span>
                </div>
                <ul className="status">
                    {/* <li><div><FcCheckmark size="35px" /></div></li>
                    <li><div><FcShop size="35px" /></div></li>
                    <li><div><FcFeedIn size="35px" /></div></li> */}
                    <li>
                        <FcShipped size="100px" />
                        <label>{data.OrderStatus}</label></li>
                </ul>
                <div className="customer" >
                    <div><FcButtingIn size="50px" /></div>
                    <div>{data.CustomerEmail} <label>{data.CustomerPhone}</label></div>
                    <FaPhoneAlt className="call" color="green" size="20px" />
                    <FcMoneyTransfer className="call" size="20px" />
                </div>
                <a href="">{translate('INVOICE')}</a>
                <div onClick={toggle} className="view-all">{translate('VIEWALL')}<br/></div>
                    <ul className="by">
                        <li>{products.length} {translate('ITEMFOR')} <FaRupeeSign /> {data.TotalAmount}</li>
                        {isShowDetails ?
                        <div>
                        <div className="table-head">
                          <label>Product</label>
                          <label>Quntatity</label>
                          <label>Price</label>
                        </div>
         { products.map((x,index)=><OrderProducts data={x} key={index}/>)}
         </div>
                            : null}
                    </ul> 
            </div>
            {
                data.OrderStatus === 'Placed' &&
                <div className="actions">
                    <li><button onClick={() => callBack(data.Id, "Accept", '')}><FcCheckmark /><label>{translate('ACCEPT')}</label></button></li>
                    <li><button onClick={() => callBack(data.Id, "Reject", '')}><FcCancel /><label>{translate('REJECT')}</label></button></li>
                </div>
            }

        </div>
    )
}