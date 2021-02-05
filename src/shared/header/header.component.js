import React from 'react';
import { IoMdMenu, IoMdClose } from "react-icons/io";
import './header.style.scss';
import SideNav from './../side-navigation/side-navigation.component';
import storage from '../../services/storage-manager.service';
import session from '../../services/session-manger.service';
import translate from '../../locale/translate';
import {GrLogout} from "react-icons/gr";
import ModalView from '../../components/modal/modal.component';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showNav: false,
            activeNav: {},
            StoreName:'Store'
        };
    }

    // async logout() {
    //     await session.logout();
    //      this.props.history.push('');
    //  }
     renderModal = () => {
        let modal = document.getElementById("myModal");
        return (
            <ModalView>
                <text>Are You Sure Want To LogOut.</text>
                <button className="primary" onClick={() => modal.style.display = "none"}>No</button>
                <button className="primary" onClick={() =>{}}>Yes</button>
            </ModalView>
        )
    }
   
   componentDidMount(){
    const store = storage.get('storeUser');
    if(store){
        const { StoreName } = store;
        this.setState({ StoreName });
    }
   }

    toggleNav(self) {
        self.setState({ showNav: !self.state.showNav })
    }
    updateNavSelection(e) {
        this.setState({activeNav: e});
    }
    render() {
        const self = this;
        const {StoreName} = self.state;
        let modal = document.getElementById("myModal");
        return (
            <div className="header">
                {this.renderModal()}
                {
                    self.state.showNav ?
                        <IoMdClose size="26px" onClick={() => { self.setState({ showNav: false }) }} style={{ margin: '6px 10px 0' }} /> :
                        <IoMdMenu size="26px" onClick={() => { self.setState({ showNav: true }) }} style={{ margin: '6px 10px 0' }} />
                }
                <span>{translate("HIUSERNAME",{name:StoreName})} {self.state.showNav} </span>
                <GrLogout size="26px" color='#fff' style={{float:'right', margin: '0px 10px 6px'}}
                onClick={()=>modal.style.display = "block"}/>
                {self.state.showNav ? <SideNav selected={(e) => {
                    self.updateNavSelection(e)
                }} active={self.state.activeNav} show={self.state.showNav} toggle={() => {
                    self.toggleNav(self)
                }} /> : null }
            </div>
        );
    }
}

export default Header;