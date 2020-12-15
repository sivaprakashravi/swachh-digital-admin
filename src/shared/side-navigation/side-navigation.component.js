import React from 'react';
import './side-navigation.style.scss';
import { IoMdClose } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import { CgLogOff } from "react-icons/cg";
import { withRouter } from "react-router-dom";
import storage from '../../services/storage-manager.service';
class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{
                label: 'Home',
                route: 'dashboard',
                active: true
            }, {
                label: 'Add Products',
                route: 'CreateProduct'
            }, {
                label: 'Add Category',
                route: ''
            },
            {
                label: 'Product List',
                route: 'productlist'
            }, {
                label: 'Orders',
                route: 'orderlist'
            }, {
                label: 'Manage Staff',
                route: ''
            }, {
                label: 'Business Settings',
                route: ''
            }],
            subList: [{
                label: 'Business Setup',
                route: 'businessSetup'
            },
            {
                label: 'My account page',
                route: 'myAccount'
            },
            {
                label: 'User management page',
                route: 'userManage'
            }
            ],
            storeSet: false
        };
    }


    handleClick = (route) => {
        this.props.history.push(route);
    }

    render() {
        const store =  storage.get('storeUser');
        const { Role,Email } = store;
        return (
            <div className={this.props.show ? 'navigation show' : 'navigation'}>
                <div className="menu">
                    <div className="profile">
                        <span><FcBusinessman size="24px" style={{ verticalAlign: 'middle', marginTop: '2px' }} /></span>
                        <label>{Email}
                            <i>{Role}</i>
                        </label>
                    </div>
                    <IoMdClose className="close" size="26px" onClick={() => {
                        this.props.toggle();
                    }} style={{ margin: '6px 10px 0' }} />
                    <ul>
                       
                        {
                            <ul>
                                {
                                    this.state.list.map(l => {
                                        return <li onClick={() => {
                                            this.props.toggle();
                                            this.handleClick(l.route);
                                        }} key={l.label} className={l.active ? 'active' : ''}>{l.label}</li>;
                                    })}
                                     <li onClick={() => this.setState({ storeSet: !this.state.storeSet })}>Store Setup</li>
                        <span className={this.state.storeSet ? 'subList' : 'none'} >
                            {
                                <>
                                    {this.state.subList.map(l => {
                                        return <li onClick={() => {
                                            this.props.toggle();
                                            this.handleClick(l.route);
                                        }} key={l.label} className={l.active ? 'active' : ''}>{l.label}</li>;
                                    })}
                                </>
                            }
                        </span>
                            </ul>
                        }
                    </ul>
                    <footer>
                        <div onClick={() => this.props.history.push('')}><CgLogOff size="18px" />Logoff</div>
                        <i>Version: 1.0.0 <label>&copy; Swachh Digital</label></i>
                    </footer>
                </div>
                {this.props.show ? <div className="overlay" onClick={this.props.toggle}></div> : null}
                
            </div>
        );
    }
}

export default withRouter(SideNav);