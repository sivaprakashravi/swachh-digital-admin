import React from 'react';
import { BsCheckBox } from 'react-icons/bs';
import './login.style.scss';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="login">
                <h3>Welcome to</h3>
                <h1>Swachh Digital</h1>
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
            </div>
        );
    }
}

export default Login;