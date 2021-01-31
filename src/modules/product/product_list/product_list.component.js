import React from 'react';
import { Listview } from './list_view.component';
import fetchservices from '../../../services/fetchsvc.service';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { BsSearch } from 'react-icons/bs';
import { IoMdClose } from "react-icons/io";
import Toast from '../../../components/toast/toast.component';
import ReactDOM from 'react-dom';
import * as _ from 'lodash';

import storage from '../../../services/storage-manager.service';
import './product_list.style.scss';

export class ProductListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            isSearch: false,
            searchText: '',
            data: []
        }
        this.getProducts = this.getProducts.bind(this);
    }

    async getProducts() {
        try {
            const store = storage.get('storeUser');
            const { StoreId } = store;
            const { state } = this.props.location;
            const baseApi = (state === 'OFFERS' ? `api/getOffers/${StoreId}` : `api/getProducts/${StoreId}`)
            const data = await fetchservices.get(baseApi);
            this.setState({ list: data, data });
        } catch (error) {
            console.log(error)
        }
    }
    componentDidMount() {
        this.getProducts();
    }

    async deleteProduct(id) {
        try {
            const list = {
                "DocId": id
            }
            const deleteApi = await fetchservices.post('api/deleteProduct', list);
            ReactDOM.render(<Toast message={deleteApi.msg} />, document.getElementById('dom'));
        } catch (error) {
            console.log(error);
        }
    }

    async editProduct(values) {
        console.log("values", values)
        try {
            const store = storage.get('storeUser');
            const userId = storage.get('userToken');
            const { email, localId, idToken } = userId;
            const { StoreId } = store;
            const list = {
                "DocId": values.DocId, "Brands": "",
                "Category": values.categoryName,
                "SubCategory": "",
                "ImageUrl": values.fileUrl,
                "IsActive": values.active,
                "IsOffer": false,
                "ProductName": values.name,
                "ProductDesc": values.description,
                "RetailPrice": values.price,
                "DeliveryChrgs": values.shippingRate,
                "Offer_Price": 0, "StoreId": StoreId, "ModifiedBy": localId
            }
            const editApi = await fetchservices.post('api/updateProduct', list);
            ReactDOM.render(<Toast message="Product Updated Successfully" />, document.getElementById('dom'));
            this.getProducts()
        } catch (error) {
            console.log(error);
        }
    }

    handleChange(event, stateVariable) {
        this.setState({ [stateVariable]: event.target.value });
    }

    doSearch() {
        const txt = this.state.searchText;
        if(txt && txt.length >= 3) {
            const filtered = _.filter(this.state.data, d => (_.includes(d.ProdDesc, txt) || _.includes(d.ProductName, txt) || _.includes(d.Category, txt)));
            this.setState({list: filtered});
        } else {            
            this.setState({list: this.state.data});
        }
    }

    noList() {
        const { state } = this.props.location;
        return (<div className="no-list"><label>{ state === 'OFFERS' ? 'No Offers Found' :'No Products Found'}</label>
       {state != 'OFFERS' && <button className="primary" onClick={() => {
            this.props.history.push('CreateProduct');
        }}>Add a Product</button>}</div>)
    }
    render() {
        const self = this;
        let list = self.state.list && self.state.list.length ? self.state.list.map((x, index) => {
            return (
                <Listview data={x} key={index} nav={self.props.history} edit={self.editProduct} delete={self.deleteProduct} getPro={self.getProducts} />
            )
        }) : self.noList();
        const { state } = self.props.location;
        return (
            <div className="products">
                <div className="sub-header"><RiArrowGoBackLine onClick={self.props.history.goBack} className="icon" size="22px" />
                    {self.state.isSearch ?
                        <input type="text" value={self.state.searchText} placeholder="Search..." onChange={(e) => self.handleChange(e, 'searchText')} onKeyUp={() => self.doSearch()} /> : <label>{state === 'OFFERS' ? 'Offers' : 'Products List'}</label>}
                    {self.state.isSearch ? <IoMdClose className="search" size="22px" onClick={() => {
                        self.setState({ isSearch: false, searchText: '' }, () => {
                            self.doSearch();
                        });
                    }} /> : <BsSearch className="search" size="22px" onClick={() => self.setState({ isSearch: true, searchText: '' })} />}
                </div>
                {list}
            </div>
        )
    }
}
