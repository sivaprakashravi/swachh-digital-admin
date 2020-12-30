import  React from 'react';
import  "./page.style.scss";

class PageScreen extends React.Component{
    handleChange(event, stateVariable) {
        this.setState({ [stateVariable]: event.target.value });
    }
    render(){
       return(
          <div className="page">
              <ul>
              <li>
               <label>Mobile :</label>
               <input type="text" maxLength={10} onChange={(e)=>this.handleChange(e, 'mobile')}/>
              </li>
              <li>
              <label>Email :</label>
               <input type="text" onChange={(e)=>this.handleChange(e, 'email')}/> 
              </li>
              <li>
                  <label>Terms & Conditions :</label>
              <textarea onChange={(e)=>this.handleChange(e, 't&c')}/>
              </li>
              </ul>
          </div> 
       )
}
};

export default PageScreen;