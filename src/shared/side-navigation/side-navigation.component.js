import React from 'react';
import './side-navigation.style.scss';
import { IoMdClose } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import { CgLogOff } from "react-icons/cg";
import { withRouter } from "react-router-dom";
import storage from '../../services/storage-manager.service';
import session from '../../services/session-manger.service';
import translate from '../../locale/translate'
class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{
                label: 'HOME',
                route: 'dashboard',
                active: true
            }, {
                label: 'ADDPRODUCT',
                route: 'CreateProduct'
            }, {
                label: 'ADDCATEGORY',
                route: ''
            },
            {
                label: 'PRODUCTLIST',
                route: 'productlist'
            }, {
                label: 'ORDERS',
                route: 'orderlist'
            }, {
                label: 'MANAGESTAFF',
                route: ''
            }],
            // }, {
            //     label: 'Business Settings',
            //     route: ''
            // }],
            subList: [{
                label: 'BUSINESSSETUP',
                route: 'businessSetup'
            },
            {
                label: 'ACCOUNTPAGE',
                route: 'myAccount'
            },
            {
                label: 'USERMANAGEMENT',
                route: 'userManage'
            }
            ],
            storeSet: false
        };
    }


    handleClick = (route) => {
        this.props.history.push(route);
    }

    logout() {
        session.logout();
        this.props.history.push('');
    }

    render() {
        const store = storage.get('storeUser');
        const { Role, Email } = store;
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
                                        }} key={l.label} className={l.active ? 'active' : ''}>{translate(l.label)}</li>;
                                    })}
                            </ul>
                        }
                        <li onClick={() => this.setState({ storeSet: !this.state.storeSet })}>{translate('STORESETUP')}</li>
                        <span className={this.state.storeSet ? 'subList' : 'none'} >
                            {
                                <>
                                    {this.state.subList.map(l => {
                                        return <li onClick={() => {
                                            this.props.toggle();
                                            this.handleClick(l.route);
                                        }} key={l.label} className={l.active ? 'active' : ''}>{translate(l.label)}</li>;
                                    })}
                                </>
                            }
                        </span>

                    </ul>
                    <footer>
                        <div onClick={() => this.logout()}><CgLogOff size="18px" />Logoff</div>
                        <i>Version: 1.0.0 <label>&copy; Swachh Digital</label></i>
                    </footer>
                </div>
                {this.props.show ? <div className="overlay" onClick={this.props.toggle}></div> : null}

            </div>
        );
    }
}

export default withRouter(SideNav);