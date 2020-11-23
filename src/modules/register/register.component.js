import React from 'react';
import  register  from "../../services/fetchsvc";

import './register.style.scss';
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storename: '',
            email: '',
            mobile: '',
            password: '',
            showPassword: '',
            confirmPassword: '',
        };
    }

    handleChange(event, stateVariable) {
        this.setState({ [stateVariable]: event.target.value });
    }

async signUP(){
   try {
    const data={
        "email":this.state.email,
        "password":this.state.password,
        "returnSecureToken":true
    }
  const dataApi =await register.logInpost('signUp',JSON.stringify(data));
  const {idToken,email,localId} = dataApi;
  await localStorage.setItem('userToken',JSON.stringify({idToken,email,localId}))
  this.props.history.push('storeRegister');
   } catch (error) {
      console.log("signup error",error) 
   }
}

    userNameControls() {
        return (
            <ul>
                <li>
                    <label>Email:</label>
                    <input type="text" value={this.state.email} onChange={(e) => { this.handleChange(e, 'email') }} />
                </li>
                <li>
                    <label>Password:</label>
                    <input type={!this.state.showPassword ? 'password' : 'text'} value={this.state.password} onChange={(e) => { this.handleChange(e, 'password') }} />
                </li>
                <li>
                    <label>Confirm Password:</label>
                    <input type="text" value={this.state.confirmPassword} onChange={(e) => { this.handleChange(e, 'confirmPassword') }} />
                </li>
                <li><button className="primary" disabled={!(this.state.confirmPassword && this.state.password && this.state.email.includes(`@gmail.com`) )}
                onClick={()=>this.signUP()}>
                    Save & continue</button></li>
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
            <div className="container">
                <h3>Welcome To</h3>
                <h1>Swachh Digital</h1>
            <div className="register">
                {this.controls()}
            </div>
            </div>
        );
    }
}

export default Register;