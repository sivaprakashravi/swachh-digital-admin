import React from 'react'
import './dashboard.style.scss'
import Modal from 'react-modal';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');
const fileInput = React.createRef();
class DashboardScreen extends React.Component{
  fileObj = [];
  fileArray = [];
constructor(props){
    super(props);
    this.state={
        url:'http://something.com',
        showModal: false,
        category:'New Category',
        selectCategory:'',
        file:[null]
    };
 
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.processFiles = this.processFiles.bind(this);
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
}

handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

async processFiles(event){
  const {category} = this.state
  await this.setState({file:URL.createObjectURL(event.target.files)})
 this.handleCloseModal();
 this.props.history.push({pathname:"addproduct",state:{image:this.state.file,type:category}});
 }

async uploadMultipleFiles(e) {
  const {category} = this.state
 await this.fileObj.push(e.target.files)
  for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
  }
 await this.setState({ file: this.fileArray })
  this.props.history.push({pathname:"addproduct",state:{image:this.state.file,type:category}});
}

modalControl(){
    return(
        <Modal 
        isOpen={this.state.showModal}
        contentLabel="Minimal Modal Example"
        style={customStyles}
     >
         <div>
             <form>
             <p>Please select your Category:</p>
             <input type="radio" id="new" name="category" value="New Category"   onChange={this.handleChange}/>
  <label for="new" style={{marginLeft:15}}>New Category</label><br/>
  <input type="radio" id="exist" name="category" value="Existing Category"   onChange={this.handleChange}/>
  <label for="exist" style={{marginLeft:15}}>Existing Category</label><br/>
  {
  this.state.category === 'Existing Category'?
  <div className="selectView">
  <label for="item">Choose a Category:</label>
<select id="item" name="categoryinput" onChange={this.handleChange}>
  <option value="volvo">Food</option>
  <option value="saab">Vegetables</option>
  <option value="fiat">Fruits</option>
  <option value="audi">Breed</option>
</select>
</div>
:
<div className="selectView" style={{marginTop:20}}>
<input type="text" value={this.state.categoryinput} name="categoryinput" onChange={this.handleChange} />
</div>
  }
             </form>
             <button className="primary" style={{margin:10}} disabled={!this.state.categoryinput} onClick={()=>document.getElementById('browser').click()}>ok</button>
         <button onClick={this.handleCloseModal}>Close Modal</button>
         <input type="file" id="browser" multiple={true}
         accept="image/*"
        style={{ display: 'none' }} 
        onChange={(e)=>this.uploadMultipleFiles(e)}
         />
         </div>
     </Modal>
    )
}

buttonControls(){
    return(
        <div className="buttonView">
<button className="primary" style={{margin:10}} onClick={this.handleOpenModal}>Add Products</button>
<button className="primary" style={{margin:10}}>Offers</button>
<button className="primary" style={{margin:10}}>Access Management</button>
<button className="primary" style={{margin:10}}>Orders</button>
<button className="primary" style={{margin:10}}>Customers</button>
<button className="primary" style={{margin:10}}>Store Setup</button>
<button className="primary" style={{margin:10}}>Reports</button>
<button className="primary" style={{margin:10}}>Store Design</button>
{this.modalControl()}
        </div>
    )
}
    render(){
        return(
<div >
<div className="greet">
<h2>Store Name</h2>
<h6 className="urlView">{this.state.url}</h6>
</div>
<div className="storeBlock">
<p>Payment setup</p><br/>
<p>store details and terms an d conditions</p><br/>
<p>store theme</p><br/>
<p>++include steps</p><br/>
</div>
{this.buttonControls()}
</div>
        )
    }
}

export default DashboardScreen;