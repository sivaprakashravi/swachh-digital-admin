import React from 'react';
import { Listview } from './customer_list.component';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { BsSearch } from 'react-icons/bs';
import { IoMdClose } from "react-icons/io";
import './customers.styles.scss';
import storage from "../../services/storage-manager.service";
import fetchservices from "../../services/fetchsvc.service";
export class CustomerScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                
            ],
            isSearch: false,
            searchText: ''
        }
        
    }

    
    async listFromApi() {
        const store = storage.get('storeUser');
        const { StoreId } = store;
        const listdata = await fetchservices.get(`api/getCustomerDetails/${StoreId}`);
        this.setState({
            list: listdata
        })
    }

componentDidMount(){
    this.listFromApi();
}

    noList() {
        return (<div className="no-list"><label>You don't have customers right now</label></div>)
    }
    render() {
        let list = this.state.list && this.state.list.length ? this.state.list.map((x, index) => {
            return (
                <Listview data={x} key={index}/>
            )
        }) : this.noList();
        const { state } = this.props.location;
        return (
            <div className="products">
                {this.state.list && this.state.list.length ? <div className="sub-header"><RiArrowGoBackLine onClick={this.props.history.goBack} className="icon" size="22px" />
                    {this.state.isSearch ? <input type="text" value={this.state.searchText} placeholder="Search..." /> : <label>Customers</label>}
                    {this.state.isSearch ? <IoMdClose className="search" size="22px" onClick={() => this.setState({ isSearch: false, searchText: '' })} /> : <BsSearch className="search" size="22px" onClick={() => this.setState({ isSearch: true, searchText: '' })} />}
                </div> : null}
                {list}
            </div>
        )
    }
}
