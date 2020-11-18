import React from 'react';
import { FaShareAlt } from 'react-icons/fa';
import './dashboard.style.scss';
import { IoMdClose } from "react-icons/io";
import { FcPlus, FcLike, FcKey, FcPaid, FcButtingIn, FcBullish, FcServices, FcIdea, FcMultipleInputs } from "react-icons/fc";
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showActions: true,
            services: [{
                label: 'Add Products',
                route: '',
                icon: <FcPlus size="35px" />
            },{
                label: 'Offers',
                route: '',
                icon: <FcLike size="35px" />
            },{
                label: 'Access management',
                route: '',
                icon: <FcKey size="35px" />
            },{
                label: 'Orders',
                route: '',
                icon: <FcPaid size="35px" />
            },{
                label: 'Customers',
                route: '',
                icon: <FcButtingIn size="35px" />
            },{
                label: 'Store Setup',
                route: '',
                icon: <FcServices size="35px" />
            },{
                label: 'Reports',
                route: '',
                icon: <FcBullish size="35px" />
            },{
                label: 'Store Design',
                route: '',
                icon: <FcIdea size="35px" />
            },{
                label: 'More Services',
                route: '',
                icon: <FcMultipleInputs size="35px" />
            }]
        };
    }

    notify() {
        return (
            this.state.showActions ?
                <div className="store-kyc warning">
                    <h5>Pending Action <IoMdClose size="18px" style={{ float: 'right' }} onClick={() => {
                        this.setState({ showActions: false })
                    }} /></h5>
                    <ul>
                        <li>Payment setup</li>
                        <li>Store details</li>
                        <li>Store theme</li>
                        <li>++ include other steps</li>
                    </ul>
                </div> : ''
        )
    }

    services() {
        return (
            <div className="services">
                <ul>
                    {
                        this.state.services.map(s => {
                            return <li key={s.label}>{s.icon}<label>{s.label}</label></li>
                        })
                    }
                </ul>
            </div>
        )
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
                {this.notify()}
                {this.services()}
            </div>
        );
    }
}

export default Dashboard;