import React from 'react';
import './side-navigation.style.scss';
import { IoMdClose } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import { CgLogOff } from "react-icons/cg";
class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{
                label: 'Home',
                route: '/',
                active: true
            },{
                label: 'Add Products',
                route: '/'
            },{
                label: 'Add Category',
                route: '/'
            },{
                label: 'Orders',
                route: '/'
            },{
                label: 'Manage Staff',
                route: '/'
            },{
                label: 'Business Settings',
                route: '/'
            }]
        };
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
                                }}  key={l.label} className={l.active ? 'active' : ''}><a href={l.route}>{l.label}</a></li>;
                            })
                        }
                    </ul>
                    <footer>
                        <a href="/login"><button><CgLogOff size="22px" />Logoff</button></a>
                        <i>Version: 1.0.0 <span>&copy; Swachh Digital</span></i>
                    </footer>
                </div>
            </div>
        );
    }
}

export default SideNav;