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
<div>
    {list}
</div>
        )
    }
}