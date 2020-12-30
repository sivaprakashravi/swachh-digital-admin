import React from 'react';
import './user_manage.style.scss';
import Subheader from '../../../components/subHeader/subHeader.component';
import { FcDebt } from "react-icons/fc";
export class UserManageScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            users:[
                {
                    user:"Sai",
                    role:"Admin"
                },
                {
                    user:"Shiva",
                    role:"Super Admin"
                }
            ]
        }
    }

    renderUSer(){
        return(
        this.state.users.map((x,index)=>{
        return(
            <div className="user-list" key={x.user} onClick={() => this.props.history.push('usersDetail')}>
                <FcDebt size="25px"/>
              <label  >{x.user}</label><br/>
            </div>
        ) 
        })
        )
    }
    render() {
        return (
            <div className="user-manage">
                <Subheader header="User Manage" callBack={this.props.history.goBack}/>
               {this.renderUSer()}
            </div>
        )
    }
}