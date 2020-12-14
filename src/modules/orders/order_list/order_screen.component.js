import React from 'react';
import '../order_screen.style.scss';
import { OrderList } from './order_list.component';
import Radio from '../../../components/radio_button/radio.component';
import fetchservices from '../../../services/fetchsvc.service'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import moment from 'moment';
import { RiFilterLine, RiArrowGoBackLine } from 'react-icons/ri';
export class OrderScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: false,
            recent: true,
            detailed: false,
            list: []
        }
    }

    componentDidMount() {
        this.listFromApi({
            "IsCurrentDate": true
        });
    }

    async listFromApi(values) {
        const store = localStorage.getItem('storeUser');
        const { StoreId } = JSON.parse(store)
        const data = {
            "StoreId": StoreId,
            ...values
        }
        const listdata = await fetchservices.post('api/getOrders', data);
        this.setState({
            list: listdata
        })
    }

    async handleSelect(select, date) {
        let startDate = moment(select.range1.startDate).format('DD-MM-YYYY');
        let endDate = moment(select.range1.endDate).format('DD-MM-YYYY');
        this.listFromApi({
            "FromDate": startDate,
            "ToDate": endDate,
            "IsCustomDate": true
        })
        await this.setState({ filter: false })
    }

    async handleChange(event, stateVariable) {
        await this.setState({ [stateVariable]: event.target.value });
        this.state.period === 'Today' && this.listFromApi({ "IsCurrentDate": true })
        this.state.period === 'This week' && this.listFromApi({ "IsLastWeek": true })
    }
    noList() {
        return (<div className="no-list"><label>No Orders Found</label><button className="primary" onClick={this.props.history.goBack}>Go Back</button></div>)
    }
    render() {
        const self = this;
        const { list } = self.state;
        let listMap = list && !list.length ? this.noList() : list.map((x, index) => {
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
                {list && list.length ? <div className="sub-header">
                    <RiArrowGoBackLine onClick={this.props.history.goBack} className="icon" size="22px" />
                    <label>Orders</label>
                    <RiFilterLine className="i-filter" size="22px" onClick={() => this.setState({ filter: !this.state.filter })} />
                </div> : null}
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
                        <select onChange={(e) => this.handleChange(e, 'period')}>
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
                    {listMap}
                </div>
            </div>
        )
    }
}