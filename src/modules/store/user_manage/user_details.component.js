import React from 'react';
import './user_manage.style.scss';
import Subheader from '../../../components/subHeader/subHeader.component';

const Userdetail =(props)=>{
    return(
        <div className="user-detail">
            <Subheader header={"User Details"} callBack={props.history.goBack}/>
            <ul>
                <li>
                    <label>User name :</label>
                    <input type="text"/>
                </li>
                <li>
                    <label>Role :</label>
                    <input type="text"/>
                </li>
                <li>
                    <label>Phone :</label>
                    <input type="text"/>
                </li>
                <li>
                    <label>Email :</label>
                    <input type="text"/>
                </li>
            </ul>
        </div>
    )
}

export default Userdetail;