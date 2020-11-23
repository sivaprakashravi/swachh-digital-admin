import React from 'react'
import './addProduct.style.scss'
export const Listview=(props)=>{
    const {data,edit} = props;

    return(
        <div className="listContainer">
           <div className="listrowView">
    <text style={{margin:10,padding:10}} >Category :{data.Category}</text><br/>
    <text style={{margin:10,padding:10}}>RetailPrice  : {data.RetailPrice}</text><br/>
    <text style={{margin:10,padding:10}}>DocId : {data.DocId}</text>
           </div>
           <button className="primary" onClick={()=>props.nav.push({pathname:'editScreen',state:data,callBack:edit})}>Edit</button>
        </div>
    )
}