import React from 'react';
import ReactDOM from 'react-dom';
import { BsCheckBox, BsEyeSlash, BsEye } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { AuthContext } from '../utils/auth-context';
import './login.style.scss';
import session from '../../services/session-manger.service';
import Toast from '../../components/toast/toast.component';

class Login extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            username: 'shanu@gmail.com',
            password: 'shanu4l',
            mobile: '',
            showPassword: false,
            isOTPControl: false,
            rememberMe: false
        };
        session.logout();
    }

    handleChange(event, stateVariable) {
        this.setState({ [stateVariable]: event.target.value });
    }
    
    handleClick = (route) => {
        this.props.history.push(route);
    }

    userNameControls() {
        const self = this;
        const { username, password } = self.state;
        return (
            <ul>
                <li>
                    <label>Username</label>
                    <input type="text" value={this.state.username} onChange={(e) => { this.handleChange(e, 'username') }} />
                </li>
                <li>
                    <label>Password</label>
                    <input type={!this.state.showPassword ? 'password' : 'text'} value={this.state.password} onChange={(e) => { this.handleChange(e, 'password') }} />
                    {this.state.showPassword ?
                        <BsEyeSlash className="eye" onClick={() => { this.setState({ showPassword: !this.state.showPassword }) }} /> :
                        <BsEye className="eye" onClick={() => { this.setState({ showPassword: !this.state.showPassword }) }} />}
                </li>
                <li><span onClick={() => {
                    this.setState({ rememberMe: !this.state.rememberMe })
                }}><BsCheckBox size="18" style={{ verticalAlign: 'top' }} color={this.state.rememberMe ? '#3f51b5' : null} /><label>Remember Me</label></span><a className="fp" href="http://#">Forgot password?</a></li>
                <li><button className="primary" disabled={!(this.state.username && this.state.password)} 
                onClick={async() => {
                    await session.login({ username, password }, self);
                    ReactDOM.render(<Toast message="Logged In" />, document.getElementById('dom'));
                }}>Login</button></li>
                <li className="sign-up">Don't have an account? <label onClick={() => this.props.history.push('register')}>Sign up</label></li>
            </ul>
        )
    }

    otpControls() {
        return (
            <ul>
                <li className="mobile-no">
                    <label>Mobile Number</label>
                    <input type="number" min="0" max="9999999999" pattern="\d*" maxLength="10" value={this.state.mobile} onChange={(e) => { this.enforce_maxlength(e); this.handleChange(e, 'mobile') }} />
                </li>
                <li><button className="primary" disabled={!(this.state.mobile && this.state.mobile.length === 10)}>Request OTP</button></li>
                <li className="sign-up">Don't have an account? <a href="http://#">Sign up</a></li>
            </ul>
        )
    }

    enforce_maxlength(event) {
        var t = event.target;
        if (t.hasAttribute('maxlength')) {
            t.value = t.value.slice(0, t.getAttribute('maxlength'));
        }
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
                    this.setState({ isOTPControl: !this.state.isOTPControl })
                }}>Login with {this.state.isOTPControl ? 'Username' : 'OTP'}</button>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="greet">
                    <h3>Welcome to</h3>
                    <h1>Swachh Digital</h1>
                </div>
                <div className="login">
                    {this.controls()}
                </div>
            </div>
        );
    }
}

export default Login;