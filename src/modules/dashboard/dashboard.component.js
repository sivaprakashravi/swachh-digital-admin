import React from 'react';
import { FaShareAlt } from 'react-icons/fa';
import './dashboard.style.scss';
import { IoMdClose } from "react-icons/io";
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showActions: true
        };
    }

    render() {
        return (
            <div className="dashboard">
                <div className="scroll-banner">
                    <ul>
                        <li className="active"></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div className="store-url"><label>My Store Name</label> <FaShareAlt size="24px" style={{ float: 'right' }} /></div>
                {this.state.showActions ?
                <div className="store-kyc warning">
                    <h5>Pending Action <IoMdClose size="18px" style={{float: 'right'}} onClick={() => {
                        this.setState({showActions: false})
                    }} /></h5>
                    <ul>
                        <li>Payment setup</li>
                        <li>Store details</li>
                        <li>Store theme</li>
                        <li>++ include other steps</li>
                    </ul>
                </div> : '' }
            </div>
        );
    }
}

export default Dashboard;