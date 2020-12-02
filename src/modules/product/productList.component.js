import React from 'react'
import List from './List.json'
import { Listview } from './listView'
import fetchservices from '../../services/fetchsvc'
import {AuthContext} from '../utils/auth-context'

export class ProductListScreen extends React.Component {
    static contextType = AuthContext

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    async getProducts() {
        try {
            const {user,userToken} = this.context
            const { StoreId } = user;
            const data = await fetchservices.get(`api/getProducts/${StoreId}`, userToken);
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
            const deleteApi = await fetchservices.post('api/deleteProduct', list, idToken);
           await  this.getProducts()
            alert(deleteApi)
        } catch (error) {

        }
    }

    async editProduct(values) {
        try {
            const store = await localStorage.getItem('storeUser');
            const userId = await localStorage.getItem('userToken');
            const { email, localId, idToken } = JSON.parse(userId);
            const { StoreId } = JSON.parse(store);
            const list = JSON.stringify({
                "DocId": values.DocId, "Brands": "",
                "Category": values.category,
                "SubCategory": "",
                "ImageUrl": values.fileUrl,
                "IsActive": values.active,
                "IsOffer": values.offerTog,
                "ProductCode": "code123",
                "ProductName": values.name,
                "ProductDesc": "",
                "RetailPrice": values.price,
                "Offer_Price": values.offerToint, "StoreId": StoreId, "ModifiedBy": localId
            })
            const editApi = await fetchservices.post('api/updateProduct', list, idToken);
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
            <div>
                {list}
            </div>
        )
    }
}