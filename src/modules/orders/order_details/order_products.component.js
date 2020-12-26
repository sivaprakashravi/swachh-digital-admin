import React from 'react';
import '../order_screen.style.scss';
import {BiRupee} from 'react-icons/bi';

const orderProducts=({data})=>{
  return(
      <div className="table-row">
         {/* <label>{data.Qty}</label>
         <label>{}</label>
         <label><BiRupee size="12px"/>{data.UnitPrice}</label> */}
      </div>
  )
}
export default orderProducts;