import React from 'react';
import './bottom-navigation.style.scss';
import { FcHome, FcList, FcServices, FcPaid, FcLike } from "react-icons/fc";
class BottomNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{
                label: 'Home',
                route: 'dashboard',
                icon: <FcHome size="22px" />,
                active: true
            }, {
                label: 'Catalogs',
                route: '/',
                icon: <FcList size="22px" />
            }, {
                label: 'Store Services',
                route: 'businessSetup',
                icon: <FcServices size="22px" />
            }, {
                label: 'Orders',
                route: 'orderlist',
                icon: <FcPaid size="22px" />
            }, {
                label: 'Offers',
                route: 'productlist',
                icon: <FcLike size="22px" />
            }]
        };
    }

    render() {
        return (
            <div className="bottom-navigation">
                <ul>
                    {
                        this.state.list.map((l, i) => {
                            return <li key={l.icon + i} onClick={() => this.props.nav.push(l.route)}>{l.icon}</li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default BottomNav;