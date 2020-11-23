import React from 'react'
import './createProduct.style.scss'
import register from '../../services/fetchsvc'

class CreateProduct extends React.Component{
    fileObj = [];
    fileArray = [];
    constructor(props){
        super(props);
        this.state={
imgs:[],
imageUrl:'',
file:null,
image:[null]
        }
    }

    handleChange = e => {
        const { name, value } = e.target;  
        this.setState({
          [name]: value
        });
      };

async CreateProductControl(){
    const {category,imageUrl,productName,price,categoryName} = this.state
    const store= await localStorage.getItem('storeUser');
    const dataId = await localStorage.getItem('userToken');
    const {email,localId,idToken} = JSON.parse(dataId);
    const {StoreId} = JSON.parse(store)
    try {
        const data={
            "Brands" : "",
            "Category" : categoryName,
            "SubCategory" : "",
            "ImageUrl" : imageUrl,
            "IsActive" : true,
            "IsOffer"  : false,
            "ProductCode" : "",
            "ProductName" : productName,
            "ProductDesc" : "",
            "RetailPrice" : price,
            "Offer_Price" : 0,
            "StoreId" : StoreId,
            "CreatedBy" : localId,
            "ModifiedBy" :localId
        }
        const create = await register.post('api/createProduct',JSON.stringify(data),idToken);
        alert(create.message);
        this.props.history.push('dashboard')
    } catch (error) {
        console.log("create product error",error)
    }
}

categoryControls(){
    return(
       <div> 
        <div className="radio">
            <form>
            <input type="radio" id="new" name="category" value="New Category"   onChange={this.handleChange}/>
  <label for="new" >New Category</label>
  <input type="radio" id="exist" name="category" value="Existing Category"   onChange={this.handleChange}/>
  <label for="exist" >Existing Category</label>
  </form>
        </div>
        <div >
            {
                this.state.category === 'Existing Category' ? 
                <ul>
                    <div className="input">
                <label for="item">Choose a Category:</label>
                </div>
                <select id="item" name="categoryName" onChange={this.handleChange} className="dropDown">
                  <option value="volvo" >Food</option>
                  <option value="saab">Vegetables</option>
                  <option value="fiat">Fruits</option>
                  <option value="audi">Breed</option>
                </select>
                </ul>          
               :
               <div className="input">
               <ul>
               <li>
                   <label>Category Name :</label>
                   <input type="text" value={this.state.categoryName} name="categoryName" onChange={ this.handleChange} />
               </li>
               </ul>
               </div>
            }
            </div>
            </div>
    )
}
async uploadMultipleFiles(e) {
 try {
    this.setState({ file: e.target.files[0] }); 
    await this.fileObj.push(e.target.files)
    for (let i = 0; i < this.fileObj[0].length; i++) {
        this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
    }
   await this.setState({ image: this.fileArray });
 } catch (error) {
     console.log("image error",error)
 }
  }

 async uploadControl(){
     console.log(this.state.file)
    const formData = new FormData();
    formData.append("fileName", this.state.file, this.state.file.name);
var requestOptions = {
    method: 'POST',
    body: formData,
    redirect: 'follow'
  };
  
  fetch("https://us-central1-retailstores-28e08.cloudfunctions.net/uploadFile", requestOptions)
    .then(response => response.text())
    .then(result => {
        this.setState({imageUrl:result.ImageUrl})
    })
    .catch(error => console.log('error', error));
    // const data = await register.uploadImage('uploadFile',formData);
    //    this.setState({imageUrl:data}) 
  }
  onFileChange = event => { 
     
    // Update the state 
    this.setState({ file: event.target.files[0] }); 
   
  }; 
uploadImage(){
    return(
        <div>
        <div className="inputView">  
  <input type="file" id="browser" multiple={true}
         accept="image/*"   
        onChange={(e)=>this.onFileChange(e)}
         />
         <div>
      <button onClick={()=>this.uploadControl()} className="primary" > 
                  Upload! 
                </button> 
                </div>
  </div>
{this.state.file ? <img src={this.state.image}  alt="product" className="productImg" /> : null }
  </div>
    )
}

productNameControls(){
 return(
     <div className="input">
    <ul>
    <li>
        <label>Product Name:</label>
        <input type="text" value={this.state.productName} name="productName" onChange={ this.handleChange } />
    </li>
    <li>
        <label>Price:</label>
        <input type={'text'} value={this.state.price} name="price" onChange={ this.handleChange } />
    </li>
    {this.uploadImage()}
    <li><button className="primary" disabled={!(this.state.productName && this.state.price && this.state.categoryName)} onClick={()=>this.CreateProductControl()}>SAVE</button></li>
</ul>
</div>
 )
}

controls(){
    return (
        <div className="controls">
       {this.categoryControls()}
       {this.productNameControls()}
        </div>)
}

    render(){
        return(
           <div>
              <h3>Enter Product Details</h3>
{this.controls()}
           </div>
        )
    }
} 

export default CreateProduct;