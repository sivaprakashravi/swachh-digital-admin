import React from 'react';
import './side-navigation.style.scss';
import { IoMdClose } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import { CgLogOff } from "react-icons/cg";
import { withRouter } from "react-router-dom";
class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{
                label: 'Home',
                route: 'dashboard',
                active: true
            },{
                label: 'Add Products',
                route: 'CreateProduct'
            },{
                label: 'Add Category',
                route: ''
            },
            {
                label: 'Product List',
                route: 'productlist'
            },{
                label: 'Orders',
                route: 'orderlist'
            },{
                label: 'Manage Staff',
                route: ''
            },{
                label: 'Business Settings',
                route: ''
            }]
        };
    }

    handleClick = (route) => {
        this.props.history.push(route);
    }

    render() {
        return (
            <div className={this.props.show ? 'navigation show' : 'navigation'}>
                <div className="menu">
                    <div className="profile">
                        <span><FcBusinessman size="24px" style={{verticalAlign: 'middle', marginTop: '2px'}} /></span>
                        <label>Username
                            <i>Administrator</i>
                        </label>
                    </div>
                    <IoMdClose className="close" size="26px" onClick={() => {
                        this.props.toggle();
                    }} style={{ margin: '6px 10px 0' }} />
                    <ul>
                        {
                            this.state.list.map(l => {
                                return <li onClick={() => {
                                    this.props.toggle();
                                    this.handleClick(l.route)
                                }}  key={l.label} className={l.active ? 'active' : ''}>{l.label}</li>;
                            })
                        }
                    </ul>
                    <footer>
                        <a href="/login"><button><CgLogOff size="22px" />Logoff</button></a>
                        <i>Version: 1.0.0 <span>&copy; Swachh Digital</span></i>
                    </footer>
                </div>
                <div className="overlay"></div>
            </div>
        );
    }
}

export default withRouter(SideNav);