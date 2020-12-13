import React from 'react';
import '../order_screen.style.scss';
import List from '../ordersList.json';
import { OrderList } from './order_list.component';
export class OrderScreen extends React.Component {
    render() {
        let list = List.map((x, index) => {
            return (
                <OrderList data={x} key={index} nav={this.props.history} />
            )
        })
        return (
            <div className="container">
                <div className="headtext-container">
                    <button className="head-text">All time</button>
                    <button className="head-text" onClick={() => { }}>Today</button>
                    <button className="head-text">Yesterday</button>
                    <button className="head-text">This week</button>
                    <button className="head-text">This Month</button>
                    <button className="head-text">Last 6 Months</button>
                </div>
                <div className="listContain">
                    {list}
                </div>
            </div>
        )
    }
}