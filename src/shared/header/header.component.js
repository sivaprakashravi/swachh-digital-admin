import React from 'react';
import { IoMdMenu, IoMdClose } from "react-icons/io";
import './header.style.scss';
import SideNav from './../side-navigation/side-navigation.component';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showNav: false
        };
    }

   componentDidMount(){
    const store = localStorage.getItem('storeUser');
    const { StoreName } = JSON.parse(store);
    this.setState({ StoreName });
   }

    toggleNav(self) {
        self.setState({ showNav: !self.state.showNav })
    }

    render() {
        const self = this;
        const {StoreName} = self.state
        return (
            <div className="header">
                {
                    self.state.showNav ?
                        <IoMdClose size="26px" onClick={() => { self.setState({ showNav: false }) }} style={{ margin: '6px 10px 0' }} /> :
                        <IoMdMenu size="26px" onClick={() => { self.setState({ showNav: true }) }} style={{ margin: '6px 10px 0' }} />
                }
                <span>{StoreName} {self.state.showNav}</span>
                <SideNav show={self.state.showNav} toggle={() => {
                    self.toggleNav(self)
                }} />
            </div>
        );
    }
}

export default Header;