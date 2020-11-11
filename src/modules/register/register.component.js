import React from 'react';
import { BsEyeSlash, BsEye } from 'react-icons/bs';


import './register.style.scss';
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storename:'',
            email:'',
            mobile:'',
            password:'',
            showPassword:'',
            confirmPassword:'',
        };
    }

    handleChange(event, stateVariable) {
        this.setState({ [stateVariable]: event.target.value });
    }

    userNameControls() {
        return (
            <ul>
                <li>
                    <label>StoreName:</label>
                    <input type="text" value={this.state.storename} onChange={(e) => { this.handleChange(e, 'storename') }} />
                </li>
                <li>
                    <label>Email:</label>
                    <input type="text" value={this.state.email} onChange={(e) => { this.handleChange(e, 'email') }} />
                </li>
                <li>
                    <label>Mobile Number:</label>
                    <input type="text" value={this.state.mobile} onChange={(e) => { this.handleChange(e, 'mobile') }} />
                </li>
                <li>
                    <label>Password:</label>
                    <input type={!this.state.showPassword ? 'password' : 'text'} value={this.state.password} onChange={(e) => { this.handleChange(e, 'password') }} />
                    {this.state.showPassword ?
                        <BsEyeSlash className="eye" onClick={() => { this.setState({ showPassword: !this.state.showPassword }) }} /> :
                        <BsEye className="eye" onClick={() => { this.setState({ showPassword: !this.state.showPassword }) }} />}
                </li>
                <li>
                    <label>Confirm Password:</label>
                    <input type="text" value={this.state.confirmPassword} onChange={(e) => { this.handleChange(e, 'confirmPassword') }} />
                </li>
                <li><button className="primary" disabled={!(this.state.storename && this.state.password && this.state.email && this.state.mobile )}>Sign up</button></li>
            </ul>
        )
    }

    controls() {
        return (
            <div className="controls">
                {this.userNameControls()}              
            </div>)
    }

    render() {
        return (
            <div className="register">
                <h3>Welcome to</h3>
                <h1>Swachh Digital</h1>
                {this.controls()}
            </div>
        );
    }
}

export default Register;