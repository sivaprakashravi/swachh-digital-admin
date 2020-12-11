import React from 'react';
import './userManage.style.scss';

export class UserManageScreen extends React.Component {
    render() {
        return (
            <div className="userManage">
                <button onClick={() => { }} className="primary">Active User 1</button>
                <button onClick={() => { }} className="primary">Active User 2</button>
            </div>
        )
    }
}