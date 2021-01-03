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
import storage from '../../../services/storage-manager.service';
import t from '../../../locale/translate'
export class OrderScreen extends React.Component {
    constructor(props) {
        const defaultRange = { startDate: new Date(), endDate: new Date() };
        super(props);
        this.state = {
            filter: false,
            recent: true,
            detailed: false,
            list: [],
            dateSelection: {
                selection: { range1: defaultRange},
                defaults: defaultRange
            }
        }
    }

    componentDidMount() {
        this.listFromApi({
            "IsCurrentDate": true
        });
    }

    async listFromApi(values) {
        console.log(values)
        const store = storage.get('storeUser');
        const { StoreId } = store;
        const data = {
            "StoreId": StoreId,
            ...values
        }
        const listdata = await fetchservices.post('api/getOrders', data);
        this.setState({
            list: listdata
        })
    }

    async orderUpdate(Id, status, reason) {
        try {
            let data = {
                "DocId": Id,
                "Status": status,
                "Reason": reason ?? null
            }
            const update = await fetchservices.post('api/updateOrderStatus', data);
            return update;
        } catch (error) {
            console.log("error", error);
        }
    }

    handleSelect(selection, defaults) {
        this.setState({ dateSelection: { selection, defaults } });
    }

    handleChange(event, stateVariable) {
        this.setState({ [stateVariable]: event.target.value });
    }

    applyFilter() {
        if (this.state.recent) {
            this.state.period === 'Today' && this.listFromApi({ "IsCurrentDate": true });
            this.state.period === 'This week' && this.listFromApi({ "IsLastWeek": true });
        } else {
            this.listFromApi({
                "FromDate": this.state.dateSelection.selection.range1.startDate,
                "ToDate": this.state.dateSelection.selection.range1.endDate,
                "IsCustomDate": true
            });
        }        
        this.setState({ filter: false });
    }
    noList() {
        return (<div className="no-list"><label>{t('NOORDERS')}</label></div>)
    }
    render() {
        const self = this;
        const { list } = self.state;
        let listMap = list && !list.length ? this.noList() : list.map((x, index) => {
            return (
                <OrderList data={x} key={index} nav={self.props.history} update={this.orderUpdate} />
            )
        });
        var dateSelection = {
            startDate: new Date(),
            endDate: new Date()
        };
        return (
            <div className="orders">
                <div className="sub-header">
                    <RiArrowGoBackLine onClick={this.props.history.goBack} className="icon" size="22px" />
                    <label>{t('ORDERS')}</label>
                    <RiFilterLine className="i-filter" size="22px" onClick={() => this.setState({ filter: !this.state.filter })} />
                </div>
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
                        <div>
                            <select onChange={(e) => this.handleChange(e, 'period')}>
                                <option>Today</option>
                                <option>This week</option>
                                <option>This month</option>
                            </select>
                            <select>
                                <option>New</option>
                                <option>Accepted</option>
                                <option>Rejected</option>
                                <option>Shipped</option>
                                <option>Delivered</option>
                            </select>
                        </div>
                        :
                        <div className="dp"><DateRange
                            onChange={(select) => self.handleSelect(select, dateSelection)}
                            ranges={[this.state.dateSelection.selection.range1]}
                            maxDate={new Date()}
                            moveRangeOnFirstSelection={false}
                        /></div>
                    }
                    <button className="secondary min" onClick={() => this.setState({ filter: false })}>Cancel</button>
                    <button className="primary min ml" onClick={() => this.applyFilter()}>Apply</button>
                </div> : null}
                <div className="list">
                    {listMap}
                </div>
            </div>
        )
    }
}