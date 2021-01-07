import React from 'react';
import ReactDOM from 'react-dom';
import { BsCheckBox, BsEyeSlash, BsEye } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { FaDailymotion, FaFacebook } from 'react-icons/fa';
import { AuthContext } from '../utils/auth-context';
import './login.style.scss';
import session from '../../services/session-manger.service';
import Toast from '../../components/toast/toast.component';
import storage from '../../services/storage-manager.service';
import constants from '../../services/constant.service';
import fetchApi from '../../services/fetchsvc.service';
class Login extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            username: 'shanu@gmail.com',
            password: 'shanu4l',
            email: '',
            // username: '',
            // password: '',
            mobile: '',
            showPassword: false,
            isForgetCoontrol: false,
            isOTPControl: false,
            isUser: true,
            rememberMe: false
        };
        session.logout();
    }

    componentDidMount() {
        const username = storage.get('_qw_ju');
        const password = storage.get('_ds_nh');
        const rememberMe = storage.get('_oi_re');
        if (username && password && rememberMe) {
            this.setState({
                username,
                password,
                rememberMe
            });
            this.doLogin();
        }
    }

    handleChange(event, stateVariable) {
        this.setState({ [stateVariable]: event.target.value });
    }

    handleClick = (route) => {
        this.props.history.push(route);
    }

    rememberHandler() {
        if (this.state.rememberMe) {
            storage.put('_qw_ju', this.state.username);
            storage.put('_ds_nh', this.state.password);
            storage.put('_oi_re', this.state.rememberMe);
        } else {
            storage.remove('_qw_ju');
            storage.remove('_ds_nh');
            storage.remove('_oi_re');
        }
    }

    async doLogin() {
        const self = this;
        const { username, password } = self.state;
        await session.login({ username, password }, self);
        self.rememberHandler();
        ReactDOM.render(<Toast message="Logged In Successfully!" />, document.getElementById('dom'));
    }

    async resetPassword() {
        try {
            const data = {
                "requestType": "PASSWORD_RESET",
                "email": this.state.email
            }
            const dataApi = await fetchApi.post('sendOobCode', data, { key: constants.key });
            ReactDOM.render(<Toast message="Sent mail,Please check" />, document.getElementById('dom'));
            this.setState({ isUser: !this.state.isUser, isForgetCoontrol: !this.state.isForgetCoontrol })
        } catch (error) {
            console.log(error);
        }
    }

    userNameControls() {
        const self = this;
        return (
            <ul>
                <li>
                    <label>Username</label>
                    <input type="text" value={self.state.username} onChange={(e) => { self.handleChange(e, 'username') }} />
                </li>
                <li>
                    <label>Password</label>
                    <input type={!self.state.showPassword ? 'password' : 'text'} value={self.state.password} onChange={(e) => { self.handleChange(e, 'password') }} />
                    {self.state.showPassword ?
                        <BsEyeSlash className="eye" onClick={() => { self.setState({ showPassword: !self.state.showPassword }) }} /> :
                        <BsEye className="eye" onClick={() => { self.setState({ showPassword: !self.state.showPassword }) }} />}
                </li>
                <li><span onClick={() => {
                    self.setState({ rememberMe: !self.state.rememberMe })
                }}><BsCheckBox size="18" style={{ verticalAlign: 'top' }} color={self.state.rememberMe ? '#0984e3' : null} /><label>Remember Me</label></span><a className="fp" onClick={() => { this.setState({ isForgetCoontrol: !self.state.isForgetCoontrol, isUser: !self.state.isUser }) }}>Forgot password?</a></li>
                <li><button className="primary" disabled={!(self.state.username && self.state.password)}
                    onClick={() => self.doLogin()}>Login</button></li>
                <li className="sign-up">Don't have an account? <label onClick={() => self.props.history.push('register')}>Sign up</label></li>
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

    forgetControls() {
        return (
            <ul>
                <li className="email">
                    <label>Email :</label>
                    <input type="text" value={this.state.email} onChange={(e) => { this.handleChange(e, 'email') }} />
                </li>
                <li><button className="primary" disabled={!(this.state.email && this.state.email.includes(`@gmail.com`))} onClick={() => this.resetPassword()}>Request Mail</button></li>
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
                {this.state.isUser && this.userNameControls()}
                {this.state.isOTPControl && this.otpControls()}
                {this.state.isForgetCoontrol && this.forgetControls()}
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
                    this.setState({ isOTPControl: !this.state.isOTPControl, isUser: !this.state.isUser })
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