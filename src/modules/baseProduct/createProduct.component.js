import React from 'react';
import './createProduct.style.scss';
import register from '../../services/fetchsvc.service';
import Radio from '../../components/radio_button/radio.component';
import Toast from '../../components/toast/toast.component';
import ReactDOM from 'react-dom';
import { AiFillPicture, AiFillCamera } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { RiArrowGoBackLine } from 'react-icons/ri';
import storage from '../../services/storage-manager.service';
import { trackPromise } from 'react-promise-tracker';
import ModalScreen from '../../components/modal/modal.component'
class CreateProduct extends React.Component {
    fileObj = [];
    fileArray = []
    constructor(props) {
        super(props);
        this.state = {
            imgs: [],
            imageUrl: {},
            file: null,
            image: null,
            categories: [],
            isNewCategory: true
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    async getCategories() {
        const store = storage.get('storeUser');
        const { StoreId } = store;
        const dataId = storage.get('userToken');
        const { email, localId, idToken } = dataId;
        const category = await register.get(`api/getCategories/${StoreId}`, idToken);
        this.setState({ categories: category.Category })
    }

    componentDidMount() {
        this.getCategories();
    }

    async CreateProductControl() { 
        try {
            const { imageUrl, productName, price, categoryName } = this.state;
            await this.setState({ id: productName.substring(0, 3) + this.randomString(3, '0123456789') });
            const store = storage.get('storeUser');
            const dataId = storage.get('userToken');
            const { email, localId, idToken } = dataId;
            const { StoreId } = store;
            const {ImageUrl} = this.state.imageUrl;
            const data = {
                "Brands": "",
                "Category": categoryName,
                "SubCategory": "",
                "ImageUrl":`${ImageUrl}`,
                "IsActive": true,
                "IsOffer": false,
                "ProductCode": this.state.id,
                "ProductName": productName,
                "ProductDesc": "",
                "RetailPrice": price,
                "OfferPrice": 0,
                "StoreId": StoreId,
                "CreatedBy": localId,
                "ModifiedBy": localId

            }
            const proId =
            {
                "ProductId": this.state.id
            }

            const productId = await register.post('api/checkProductCode', proId);
            const len = Object.keys(productId).length; // 2
            if (len === 0) {
                const create = await register.post('api/createProduct', data);
                ReactDOM.render(<Toast message={create.message} />, document.getElementById('dom'));
                   if(this.state.categories.length < 1){
                    let modal = document.getElementById("myModal");
                    modal.style.display = "block";
                   }else{
                    this.props.history.push('productlist')
                   }
            } else {
                this.CreateProductControl();
            }
        } catch (error) {
            console.log("create product error", error)
        }
    }

    renderModal(){
        return(
            <ModalScreen>
                <div className="actions">
                    <text>New product successfully added to your store.Would you like to add more products.</text><br/>
                    <button className="accept" onClick={()=> this.props.history.push('createProduct')}>Yes</button>
                    <button className="reject" onClick={()=> this.props.history.push('dashboard')}>No</button>
                </div>
            </ModalScreen>
        )
    }

    //generate random value
    randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i)
            result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }


    categoryControls() {
        return (
            <div>
                <div className="radio">
                    <Radio label="New Category" checked={this.state.isNewCategory} onChange={() => this.setState({ isNewCategory: true, categoryName: null })
                    } />
                    <Radio label="Existing Category" checked={!this.state.isNewCategory} onChange={() => this.setState({ isNewCategory: false, categoryName: null })} />
                </div>
            </div>
        )
    }
    async uploadMultipleFiles(e) {
        const self = this;
        try {
            self.setState({ file: e.target.files[0] });
            await self.fileObj.push(e.target.files)
            for (let i = 0; i < self.fileObj[0].length; i++) {
                self.fileArray = [URL.createObjectURL(self.fileObj[0][i])];
            }
            await self.setState({ image: self.fileArray });
        } catch (error) {
            console.log("image error", error)
        }
    }

    async uploadControl() {
        const formData = new FormData();
        formData.append("fileName", this.state.file, this.state.file.name);
        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        trackPromise(fetch("https://us-central1-retailstores-28e08.cloudfunctions.net/uploadFile", requestOptions)
            .then(response => response.text())
            .then(async result => {
               await this.setState({ imageUrl: JSON.parse(result) });
                this.CreateProductControl();
            })
            .catch(error => console.log('error', error)));
        // const data = await register.uploadImage('uploadFile',formData);
        //    this.setState({imageUrl:data}) 
    }
    onFileChange = event => {

        // Update the state 
        this.setState({ file: event.target.files[0] });

    };
    removeImage(index) {
        const images = this.state.image;
        const removedIndex = images.filter((im, i) => i !== index);
        this.setState({ image: removedIndex });
    }
    uploadImage() {
        return (
            <div>
                {this.state.image && this.state.image.length ? <div className="image-container">
                    {this.state.image.map((image, i) => {
                        return <div key={'img-box' + i} className="uploaded-image" style={{ 'background-image': `url(${image})` }}><IoMdClose size="30px" onClick={() => this.removeImage(i)} className="remove" color="#fff" />
                        </div>
                    })}
                </div> :
                    <div>
                        <div className={(navigator && navigator.camera) ? 'image-placeholder' : 'image-placeholder full'}>
                            <input type="file" multiple={false} accept="image/*" onChange={(e) => this.uploadMultipleFiles(e)} />
                            <AiFillPicture size="24px" />
                            <label>Select Images</label>
                        </div>
                        {
                            (navigator && navigator.camera) &&
                            <div className="camera-placeholder" onClick={() => this.capture()}>
                                <AiFillCamera size="24px" />
                                <label>Capture Image</label>
                            </div>
                        }
                    </div>}

            </div>
        )
    }

    capture() {
        const self = this;
        var cameraCallback = function (imageData) {
            fetch("data:image/jpeg;base64," + imageData)
                .then(res => res.blob())
                .then(async(blob) => {
                    self.setState({ file: blob });
                    await self.fileObj.push(blob)
                    self.fileArray = [URL.createObjectURL(blob)];
                    self.setState({ image: self.fileArray });
                });
        }

        var cameraError = function (imageData) {
            console.log('error');
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
        }
        navigator.camera.getPicture(cameraCallback, cameraError, {
            quality: 20,
            saveToPhotoAlbum: true,
            destinationType: 0
        });
    }

    productNameControls(optionItems) {
        return (
            <div className="input">
                <ul>
                    <li>
                        <label>{this.state.isNewCategory ? 'Category Name' : 'Select from Category'}:</label>
                        {
                            !this.state.isNewCategory ?
                                <select id="item" name="categoryName" onChange={this.handleChange} className="dropDown">
                                    {optionItems}
                                </select>
                                :
                                <input type="text" value={this.state.categoryName} name="categoryName" onChange={this.handleChange} />
                        }
                    </li>
                    <li>
                        <label>Product Name:</label>
                        <input type="text" value={this.state.productName} name="productName" onChange={this.handleChange} />
                    </li>
                    <li>
                        <label>Price:</label>
                        <input type={'text'} value={this.state.price} name="price" onChange={this.handleChange} />
                    </li>
                    {this.uploadImage()}
                </ul>
                <button disabled={!(this.state.productName && this.state.price && this.state.categoryName && this.state.image)} onClick={() => this.uploadControl()} className="primary">Add Product</button>
            </div>
        )
    }

    controls(optionItems) {
        return (
            <div className="controls">
                {this.categoryControls(optionItems)}
                {this.productNameControls(optionItems)}
            </div>)
    }

    render() {
        let planets = this.state.categories;
        let optionItems = planets.map((planet) =>
            <option key={planet}>{planet}</option>
        );
        return (
            <div className="create-product">
                <div className="sub-header"><RiArrowGoBackLine onClick={this.props.history.goBack} className="icon" size="22px" /><label>Add Product</label></div>
               {this.renderModal()}
                {this.controls(optionItems)}
            </div>
        )
    }
}

export default CreateProduct;