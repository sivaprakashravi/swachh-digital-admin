import React from 'react'
import './orderScreen.style.scss'
import List from './ordersList.json'
import {OrderList} from './orderList.component'
export class OrderScreen extends React.Component{
    render(){
        let list = List.map((x,index)=>{
            return(
<OrderList data={x} key={index} nav={this.props.history}/>
            )
        })
        return(
<div className="container">
    <div className="headtextContainer">
    <button className="headText">All time</button>
    <button className="headText" onClick={()=>{}}>Today</button>
    <button className="headText">Yesterday</button>
    <button className="headText">This week</button>
    <button className="headText">This Month</button>
    <button className="headText">Last 6 Months</button>
    </div>
    <div className="orderlistContainer">
    {list}
    </div>
</div>
        )
    }
}