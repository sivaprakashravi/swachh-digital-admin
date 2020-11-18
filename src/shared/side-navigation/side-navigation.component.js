import React from 'react';
import './side-navigation.style.scss';
import { IoMdClose } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{
                label: 'Menu Option',
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
                                return <li key={l.label}>{l.label}</li>;
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default SideNav;