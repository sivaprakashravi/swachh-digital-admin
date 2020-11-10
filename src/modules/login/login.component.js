import React from 'react';
import { BsCheckBox } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

import './login.style.scss';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOTPControl: false,
            rememberMe: false
        };
    }

    userNameControls() {
        return (
            <ul>
                <li>
                    <label>Username</label>
                    <input type="text" />
                </li>
                <li>
                    <label>Password</label>
                    <input type="password" />
                </li>
                <li><span onClick={() => {
                    this.setState({rememberMe: !this.state.rememberMe})
                }}><BsCheckBox size="18" color={this.state.rememberMe ? '#3f51b5': null} /><label>Remember Me</label></span><a className="fp" href="http://#">Forgot password?</a></li>
                <li><button className="primary">Login</button></li>
                <li className="sign-up">Don't have an account? <a href="http://#">Sign up</a></li>
            </ul>
        )
    }

    otpControls() {
        return (
            <ul>
                <li>
                    <label>Mobile Number</label>
                    <input type="text" />
                </li>
                <li><button className="primary">Request OTP</button></li>
                <li className="sign-up">Don't have an account? <a href="http://#">Sign up</a></li>
            </ul>
        )
    }

    controls() {
        return (
            <div className="controls">
                {this.state.isOTPControl ? this.otpControls() : this.userNameControls()}
                {this.externalControls()}
                {this.switchControls()}
            </div>)
    }

    externalControls() {
        return (
            <div className="external-auth">
                <button><FaFacebook size="18" color="#3b5998" /></button>
                <button><FcGoogle size="18" /></button>
            </div>
        )
    }

    switchControls() {
        return (
            <div className="otp">
                <button onClick={() => {
                    this.setState({isOTPControl: !this.state.isOTPControl})
                }}>Login with {this.state.isOTPControl ? 'Username' : 'OTP'}</button>
            </div>
        )
    }

    render() {
        return (
            <div className="login">
                <h3>Welcome to</h3>
                <h1>Swachh Digital</h1>
                {this.controls()}
            </div>
        );
    }
}

export default Login;