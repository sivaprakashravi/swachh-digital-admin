import React from 'react';
import './user_manage.style.scss';

export class UserManageScreen extends React.Component {
    render() {
        return (
            <div className="user-manage">
                <button onClick={() => { }} className="primary">Active User 1</button>
                <button onClick={() => { }} className="primary">Active User 2</button>
            </div>
        )
    }
}