import React from 'react';
import { BsCheckBox } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

import './login.style.scss';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    externalControls() {
        return (
            <div className="external-auth">
                <button><FaFacebook size="18" color="#3b5998" /></button>
                <button><FcGoogle size="18" /></button>
            </div>
        )
    }

    render() {
        return (
            <div className="login">
                <h3>Welcome to</h3>
                <h1>Swachh Digital</h1>
                <div className="controls">
                    <ul>
                        <li>
                            <label>Username</label>
                            <input type="text" />
                        </li>
                        <li>
                            <label>Password</label>
                            <input type="password" />
                        </li>
                        <li><span><BsCheckBox size="18" /><label>Remember Me</label></span><a className="fp" href="http://#">Forgot password?</a></li>
                        <li><button className="primary">Login</button></li>
                        <li className="sign-up">Don't have an account? <a href="http://#">Sign up</a></li>
                    </ul>
                    {this.externalControls()}
                </div>
            </div>
        );
    }
}

export default Login;