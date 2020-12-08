import React from "react";
import './setup.style.scss'

export class SetupScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    handleChange(event, stateVariable) {
        this.setState({ [stateVariable]: event.target.value });
    }
inputController(){
    const{storeName,tagline,userName,contact,address,gst} = this.state
    return(
        <div className="input">
    <ul>
        <li>
            <label>Store Name:</label>
            <input type="text" value={storeName} onChange={(e) => { this.handleChange(e, 'storeName') }} />
        </li>
        <li>
            <label>Tag Line:</label>
            <input type="text" value={tagline} onChange={(e) => { this.handleChange(e, 'tagline') }} />
        </li>
        <li>
            <label>userName:</label>
            <input type="number" value={userName} onChange={(e) => { this.handleChange(e, 'userName') }} />
        </li>
        <li>
            <label>Contact:</label>
            <input type="text" value={contact} onChange={(e) => { this.handleChange(e, 'contact') }} />
        </li>
        <li>
            <label>Address:</label>
            <input type="text" value={address} onChange={(e) => { this.handleChange(e, 'address') }} />
        </li>
        <li>
            <label>GST Number:</label>
            <input type="text" value={gst} onChange={(e) => { this.handleChange(e, 'gst') }} />
        </li>
        <text onClick={()=>{}}>Privacy & return policy</text>
</ul>
</div>
    )
}
    render(){
        return(
            <div className="setupContainer">
                <h2>Store setup page</h2>
{this.inputController()}
            </div>
        )
    }
}

