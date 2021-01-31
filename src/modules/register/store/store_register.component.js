import React from 'react';
import './store_register.style.scss';
import register from '../../../services/fetchsvc.service';
import storage from '../../../services/storage-manager.service';
import Toast from '../../../components/toast/toast.component';
import ReactDOM from 'react-dom';
class StoreRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storename: '',
            address: '',
            contact: '',
            id: ''
        };

    }

    componentDidMount() {
        const data = storage.get('userToken');
        if(!data) {
            // this.props.history.go('register');
        }
    }

    async registerControl() {
        try {
            const { storename, address, contact } = this.state;
            const user = storage.get('userToken');
            const { email, localId, idToken } = user;
            await this.setState({ id: this.state.storename.substring(0, 4) + this.randomString(4, '0123456789') });
            const data = {
                "StoreName": storename,
                "StoreAddress": address,
                "StoreId": this.state.id,
                "Email": email,
                "StoreContact": contact,
                "CreatedBy": localId,
                "ModifiedBy": localId,
                "LogoUrl": "",
                "Pincode": "",
                "UserId": localId,
                "GST": "",
            "TagLine": "",
            "StoreTheme": ""
            };
            const checkId = await register.get(`api/getStoreDetails/${this.state.id}`, idToken);
            const len = Object.keys(checkId).length;
            if (len < 1) {
                const dataApi = await register.post('api/createStore', data, idToken);
                ReactDOM.render(<Toast message={"congratulations,Your store is successfully created please add Your product now"} />, document.getElementById('dom'));
                await storage.put('storeUser', dataApi);
                this.props.history.push('createProduct');
            } else {
                this.registerControl()
            }

        } catch (error) {
            console.log("store register", error);
            ReactDOM.render(<Toast message={"Something Went Wrong"} />, document.getElementById('dom'));
        }
    }

    //generate random value
    randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i)
            result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }

    handleChange(event, stateVariable) {
        this.setState({ [stateVariable]: event.target.value });
    }

    enforce_maxlength(event) {
        var t = event.target;
        if (t.hasAttribute('maxlength')) {
            t.value = t.value.slice(0, t.getAttribute('maxlength'));
        }
    }
    storeNameControls() {
        return (
            <ul>
                <li>
                    <label>Store Name :</label>
                    <input type="text" value={this.state.storename} maxLength={20} onChange={(e) => { this.handleChange(e, 'storename') }} />
                </li>
                <li>
                    <label>Address :</label>
                    <input type={'text'} value={this.state.address} onChange={(e) => { this.handleChange(e, 'address') }} />
                </li>
                <li>
                    <label>Mobile Number :</label>
                    <input type="number" min="0" max="9999999999" pattern="\d*" maxLength="10" value={this.state.contact} onChange={(e) => { this.enforce_maxlength(e); this.handleChange(e, 'contact') }} />
                </li>
                <li><button className="primary" disabled={!(this.state.storename && this.state.address && this.state.contact)} onClick={() => this.registerControl()}>Save & Continue</button></li>
            </ul>
        )
    }


    controls() {
        return (
            <div className="controls">
                {this.storeNameControls()}
            </div>)
    }

    render() {
        return (
      
                
            <div className="store-register">
            <h3 className="header">Enter Store Details </h3>
            <div className="register">
                {this.controls()}
            </div>
            </div>
           
        )
    }
}

export default StoreRegister;