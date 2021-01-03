import React from 'react';
import './order_edit.style.scss';
import SubHead from '../../../components/subHeader/subHeader.component';
import fetchservices from '../../../services/fetchsvc.service';
import {AiFillCheckCircle } from "react-icons/ai";
import ReactDOM from 'react-dom';
import Toast from '../../../components/toast/toast.component';
import Radio from '../../../components/radio_button/radio.component';
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
           link:"",
           payment:'COD'
        }
    };

    componentDidMount() {
        const { OrderId, customer_name, amount, paymentType, paymentStatus, product_name, category,
            items_count, invoice, CustomerEmail,  CustomerPhone,OrderStatus,Id
        } = this.props.location.state;
        this.setState({
            id: OrderId, customerName: customer_name, mobile: CustomerPhone, name: product_name
            , invoice: invoice, price: amount, items: items_count, email: CustomerEmail,status:OrderStatus,DocId:Id
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

   async handleSubmit(){
        try {
            const data = {
                "DocId" : this.state.DocId,
                "TrackingLink" : this.state.link,
                "OrderStatus" : this.state.status,
                "PaymentType" : this.state.payment
            };
           const dataApi = await fetchservices.post('api/editOrder',data);
           ReactDOM.render(<Toast message={dataApi.msg} />, document.getElementById('dom'));
        } catch (error) {
            console.log(error)
        }
    }

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
                        <label>Tracking Link:</label>
                        <input type="text" value={link?? ''} onChange={(e) => { this.handleChange(e, 'link') }} />
                    </li>
                    {/* <li>
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
                    </li> */}
                    <li>
                        <label>No.Of Items:</label>
                        <input type="text" value={Productlength}  readOnly={true} />
                    </li>
                    <li>
                    <label>Order Status:</label>
                    </li>
                    <div className="option-view">
                   {status === 'New' && <li>
                   <Radio label="New" checked={true} />
                            </li>}
                   {(status === 'New' || status === 'Accepted') && <li  onClick={() => {}}>
                   <Radio label="Accepted" checked={this.state.accept} onChange={() => this.setState({ accept: !this.state.accept,status:(this.state.accept ? null : 'Accepted')})}/>
                            </li>}
                           { (status === 'Accepted' || status === 'Shipped' || status=== 'New')
                                    &&
                            <li>
                                <Radio label="Shipped" checked={(this.state.shipped || status === 'Shipped') ? true : false} onChange={() => this.setState({ shipped: !this.state.shipped,status:(this.state.shipped ? this.state.status : 'Shipped') })} />
                              
                            </li>}
                           {(status === 'Accepted' || status === 'Shipped' || status=== 'Delivered') && <li  >
                           <Radio label="Delivered" checked={(this.state.delivered || status=== 'Delivered')? true : false} onChange={() => this.setState({ delivered: !this.state.delivered,status:(this.state.delivered ? this.state.status : 'Delivered')})}/>   
                            </li>}
                            </div>
                    <li>
                        <label>Payment type:</label>
                        <select id="status" name="status" defaultValue="COD" onChange={(e) => this.handleChange(e, 'payment')} >
                    <option >COD(Cash on delivery)</option>
                </select>
                    </li>
                    <li><button className="primary" onClick={() => this.handleSubmit()}>Save</button></li>
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