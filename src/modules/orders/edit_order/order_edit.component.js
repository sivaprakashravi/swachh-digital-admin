import React from 'react';
import './order_edit.style.scss';
import SubHead from '../../../components/subHeader/subHeader.component';
import fetchservices from '../../../services/fetchsvc.service';
import {AiFillCheckCircle } from "react-icons/ai";

export class OrderEditScreen extends React.Component {
    fileObj = [];
    fileArray = [];
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            subCategories: [],
            image: null,
            file: null,
            active: true,
            offerTog: false,
            Productlength:0,
            accept:false,
            shipped:false,
            delivered:false,
            placed:true,
        }
    };

    componentDidMount() {
        const { OrderId, customer_name, amount, paymentType, paymentStatus, product_name, category,
            items_count, invoice, CustomerEmail, tracking_link, CustomerPhone,OrderStatus
        } = this.props.location.state;
        this.setState({
            id: OrderId, customerName: customer_name, mobile: CustomerPhone, name: product_name, link: tracking_link
            , invoice: invoice, price: amount, items: items_count, email: CustomerEmail,status:OrderStatus
        });
        this.orderList()
    };


   async orderList(){
       try {
          const dataApi = await fetchservices.get(`api/getOrdersbyId/${this.props.location.state.Id}`);
          this.setState({Productlength:dataApi.length})
       } catch (error) {
           console.log(error)
       }
    }

    handleChange(event, stateVariable) {
        this.setState({ [stateVariable]: event.target.value });
    };

    categoryControl() {
        return (
            <ul>
                <div className="input">
                    <label >Choose a Payment status:</label>
                </div>
                <select id="status" name="status" onChange={(e) => this.handleChange(e, 'status')} className="drop-down">
                    <option >Pending</option>
                    <option >Processing</option>
                    <option>Credited</option>
                </select><br />
                <div className="input">
                    <label >Choose a Payment type:</label>
                </div>
                <select id="type" name="type" onChange={(e) => this.handleChange(e, 'type')} className="drop-down">
                    <option >COD</option>
                    <option >Online</option>
                </select>
            </ul>
        )
    };


    inputController() {
        const { name, id, price, link, customerName, mobile, Productlength,email, invoice,status } = this.state;
        return (
            <div className="input">
                <ul>
                    <li>
                        <label>Order ID:</label>
                        <input type="text" value={id??''}  readOnly={true} />
                    </li>
                    <li>
                        <label>tracking Link:</label>
                        <input type="text" value={link?? ''} onChange={(e) => { this.handleChange(e, 'link') }} />
                    </li>
                    <li>
                        <label>Customer Name:</label>
                        <input type="text" value={customerName ?? ''} onChange={(e) => { this.handleChange(e, 'customerName') }} />
                    </li>
                    <li>
                        <label>Customer Mobile:</label>
                        <input type="text" value={mobile??''} onChange={(e) => { this.handleChange(e, 'mobile') }} />
                    </li>
                    <li>
                        <label>Email:</label>
                        <input type="text" value={email??''} onChange={(e) => { this.handleChange(e, 'email') }} readOnly={true} />
                    </li>
                    <li>
                        <label>No.Of Items:</label>
                        <input type="text" value={Productlength}  readOnly={true} />
                    </li>
                    <li>
                    <label>Order Status:</label>
                    </li>
                    <div className="option-view">
                   {status === 'New' && <li className="options" >
                                <AiFillCheckCircle color={this.state.placed ? '#3f51b5' : '#ccc'} size="1.5rem" />
                                <label style={{ marginBottom: 10 }}>New</label>
                            </li>}
                   {(status === 'New' || status === 'Accept') && <li className="options" onClick={() => this.setState({ accept: !this.state.accept })}>
                                <AiFillCheckCircle color={(this.state.accept || status === 'Accept') ? '#3f51b5' : '#ccc'} size="1.5rem" />
                                <label style={{ marginBottom: 10 }}>Accept</label>
                            </li>}
                            <li className="options" onClick={() => this.setState({ shipped: !this.state.shipped })}>
                                <AiFillCheckCircle color={(this.state.shipped || status === 'Shipped') ? '#3f51b5' : '#ccc'} size="1.5rem" />
                                <label>shipped</label>
                            </li>
                           {(status === 'Accept' || status === 'Shipped') && <li className="options" onClick={() => this.setState({ delivered: !this.state.delivered })}>
                                <AiFillCheckCircle color={this.state.delivered ? '#3f51b5' : '#ccc'} size="1.5rem" />
                                <label>Delivered</label>
                            </li>}
                            </div>
                    <li>
                        <label>Payment type:</label>
                        <select id="status" name="status" defaultValue="COD" onChange={(e) => this.handleChange(e, 'payment')} >
                    <option >COD</option>
                </select>
                    </li>
                    <li><button className="primary" onClick={() => { }}>Save</button></li>
                </ul> 
            </div>
        )
    };

    render() {
        return (
            <div className="order-edit">
                <SubHead header={"Edit Order"} callBack={this.props.history.goBack}/>
                {/* {this.categoryControl()} */}
                {this.inputController()}              
            </div>
        )
    }
}