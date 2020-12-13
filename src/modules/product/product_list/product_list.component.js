import React from 'react';
import { Listview } from './list_view.component';
import fetchservices from '../../../services/fetchsvc.service';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { BsSearch } from 'react-icons/bs';
import { IoMdClose } from "react-icons/io";
export class ProductListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            isSearch: false,
            searchText: ''
        }
    }

    async getProducts() {
        console.log("call")
        try {
            const store = await localStorage.getItem('storeUser');
            const { StoreId } = JSON.parse(store);
            const data = await fetchservices.get(`api/getProducts/${StoreId}`);
            this.setState({ list: data })
        } catch (error) {
            console.log(error)
        }
    }
    componentDidMount() {
        this.getProducts();
    }

    async deleteProduct(id) {
        try {
            const store = await localStorage.getItem('storeUser');
            const userId = await localStorage.getItem('userToken');
            const { email, localId, idToken } = JSON.parse(userId);
            const { StoreId } = JSON.parse(store);
            const list = JSON.stringify({
                "DocId": id
            })
            const deleteApi = await fetchservices.post('api/deleteProduct', list);
            alert(deleteApi)
            this.getProducts()
        } catch (error) {

        }
    }

    async editProduct(values) {
        console.log("values", values)
        try {
            const store = await localStorage.getItem('storeUser');
            const userId = await localStorage.getItem('userToken');
            const { email, localId, idToken } = JSON.parse(userId);
            const { StoreId } = JSON.parse(store);
            const list = {
                "DocId": values.DocId, "Brands": "",
                "Category": values.categoryName,
                "SubCategory": "",
                "ImageUrl": "",
                "IsActive": values.active,
                "IsOffer": false,
                "ProductCode": "",
                "ProductName": values.name,
                "ProductDesc": "",
                "RetailPrice": values.price,
                "Offer_Price": 0, "StoreId": StoreId, "ModifiedBy": localId
            }
            const editApi = await fetchservices.post('api/updateProduct', list);
            this.getProducts()
            alert(editApi)

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let list = this.state.list.map((x, index) => {
            return (
                <Listview data={x} key={index} nav={this.props.history} edit={this.editProduct} delete={this.deleteProduct} />
            )
        })
        return (
            <div className="products">
                <div className="sub-header"><RiArrowGoBackLine className="icon" size="22px" />
                {this.state.isSearch ? <input type="text" value={this.state.searchText} placeholder="Search..." /> : <label>Products List</label>}
                {this.state.isSearch ? <IoMdClose className="search" size="22px" onClick={() => this.setState({isSearch: false, searchText: ''})} /> : <BsSearch className="search" size="22px" onClick={() => this.setState({isSearch: true, searchText: ''})} />}</div>
                {list}
            </div>
        )
    }
}
