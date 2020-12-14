import React from 'react';
import '../order_screen.style.scss';
import List from '../ordersList.json';
import { OrderList } from './order_list.component';
import Radio from '../../../components/radio_button/radio.component';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { RiFilterLine, RiArrowGoBackLine } from 'react-icons/ri'
export class OrderScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: false,
            recent: true,
            detailed: false
        }
    }
    handleSelect(select, date){
        date.startDate = select.range1.startDate;
        date.endDate = select.range1.endDate;
        console.log(select, date); // native Date object
      }
    render() {
        const self = this;
        let list = List.map((x, index) => {
            return (
                <OrderList data={x} key={index} nav={self.props.history} />
            )
        });
        var dateSelection = {
            startDate: new Date(),
            endDate: new Date()
        };
        return (
            <div className="orders">
                <div className="sub-header"><RiArrowGoBackLine onClick={this.props.history.goBack} className="icon" size="22px" /><label>Orders</label> <RiFilterLine className="i-filter" size="22px" onClick={() => this.setState({filter: !this.state.filter})} /></div>
                {this.state.filter ? <div className="filter">
                    <ul>
                        <li>
                            <Radio label="Recent Orders" checked={self.state.recent} onChange={() => self.setState({ recent: true, detailed: false })
                            } /></li>
                        <li>
                            <Radio label="Detailed Orders" checked={self.state.detailed} onChange={() => self.setState({ recent: false, detailed: true })
                            } /></li>
                    </ul>
                    {self.state.recent ?
                        <select>
                            <option>Today</option>
                            <option>This week</option>
                            <option>This month</option>
                        </select>
                        :
                        <div className="dp"><DateRange
                        onChange={(select) => self.handleSelect(select, dateSelection)}
                        ranges={[dateSelection]}
                        maxDate={new Date()}
                        /></div>
                    }
                    
                <div><button className="primary">Filter</button></div>
                </div> : null}
                <div className="list">
                    {list}
                </div>
            </div>
        )
    }
}