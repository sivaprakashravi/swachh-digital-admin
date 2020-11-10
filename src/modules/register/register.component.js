import React from 'react';
import { BsCheckBox, BsEyeSlash, BsEye } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

import './register.style.scss';
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="register">
                <h3>Welcome to</h3>
                <h1>Swachh Digital</h1>
            </div>
        );
    }
}

export default Register;