import React from 'react';
import { FaShareAlt } from 'react-icons/fa';
import './dashboard.style.scss';
import { IoMdClose } from "react-icons/io";
import { FcPlus, FcLike, FcKey, FcPaid, FcButtingIn, FcBullish, FcServices, FcIdea, FcMultipleInputs } from "react-icons/fc";
import Carousel from 're-carousel';
import IndicatorDots from './indicators';
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showActions: true,
            services: [{
                label: 'Add Products',
                route: 'CreateProduct',
                icon: <FcPlus size="35px" />
            }, {
                label: 'Offers',
                route: '',
                icon: <FcLike size="35px" />
            }, {
                label: 'Access management',
                route: '',
                icon: <FcKey size="35px" />
            }, {
                label: 'Orders',
                route: 'orderlist',
                icon: <FcPaid size="35px" />
            }, {
                label: 'Customers',
                route: '',
                icon: <FcButtingIn size="35px" />
            }, {
                label: 'Store Setup',
                route: '',
                icon: <FcServices size="35px" />
            }, {
                label: 'Reports',
                route: '',
                icon: <FcBullish size="35px" />
            }, {
                label: 'Store Design',
                route: '',
                icon: <FcIdea size="35px" />
            }, {
                label: 'More Services',
                route: '',
                icon: <FcMultipleInputs size="35px" />
            }]
        };
    }

    banner() {
        return (
            <div className="scroll-banner">
                <Carousel loop auto widgets={[IndicatorDots]}>
                    <div className="scroll-item">Frame 1</div>
                    <div className="scroll-item">Frame 2</div>
                    <div className="scroll-item">Frame 3</div>
                </Carousel>
            </div>
        )
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
                            console.log("check",s)
                            return <li key={s.label} onClick={()=>this.props.history.push(s.route)}>{s.icon}<label>{s.label}</label></li>
                        })
                    }
                </ul>
            </div>
        )
    }

    render() {
        return (
            <div className="dashboard">
                {this.banner()}
                <div className="store-url"><label>My Store Name</label> <FaShareAlt size="24px" style={{ float: 'right' }} /></div>
                {this.notify()}
                {this.services()}
            </div>
        );
    }
}

export default Dashboard;