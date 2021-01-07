import React from 'react';
import './edit_product.style.scss';
import fetchservices from "../../../services/fetchsvc.service";
import Radio from '../../../components/radio_button/radio.component';
import { AiFillPicture, AiFillCamera, AiFillCheckCircle } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { RiArrowGoBackLine } from 'react-icons/ri';
import storage from '../../../services/storage-manager.service';

export class EditScreen extends React.Component {
    //static contextType = AuthContext
    fileObj = [];
    fileArray = []
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            subCategories: [],
            file: null,
            active: true,
            offerTog: false,
            isNewCategory: true,
            isNewSubCategory: true,
        }
        this.handleChangeTogActive = this.handleChangeTogActive.bind(this);
        this.handleChangeTogOffer = this.handleChangeTogOffer.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChangeTogActive(active) {

        this.setState({ active });
    }
    handleChangeTogOffer(offerTog) {

        this.setState({ offerTog });
    }
    async getCategories() {
        const store = await storage.get('storeUser');
        const { StoreId } = store;
        const category = await fetchservices.get(`api/getCategories/${StoreId}`);
        this.setState({ categories: category.Category, subCategories: category.SubCategory })
    }

    componentDidMount() {
        const { ProductName, RetailPrice, Category, ProdDesc, Offer_Price, Imageurl, DeliveryChrgs } = this.props.location.state;
        const { type } = this.props.location
        this.setState({ name: ProductName, price: RetailPrice, categoryName: Category, description: ProdDesc, offer: Offer_Price, shippingRate: DeliveryChrgs })
        {
            Imageurl && this.setState({
                image: [Imageurl]
            })
        }
        this.getCategories()
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

        fetch("https://us-central1-retailstores-28e08.cloudfunctions.net/uploadFile", requestOptions)
            .then(response => response.text())
            .then(result => {
                this.setState({ imageUrl: result });

            })
            .catch(error => console.log('error', error));
        // const data = await fetchservices.uploadImage('uploadFile',formData);
        //    this.setState({imageUrl:data}) 
    };

    async removeImage(index) {
        try {
            const images = this.state.image;
            const removedIndex = images.filter((im, i) => i !== index);
            this.setState({ image: removedIndex });
            const { Imageurl } = this.props.location.state;
            if (Imageurl) {
                console.log(Imageurl);
                const name = Imageurl.split(/([!,?,/])/);
                const imgData = {
                    "FileName": name[14]
                }
                const delImage = await fetchservices.post('api/deleteProdImage', imgData);
                console.log(delImage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    capture() {
        const self = this;
        console.log(self + 'camera opened');
        var cameraCallback = function (imageData) {
            console.log('captured');
            fetch("data:image/jpeg;base64," + imageData)
                .then(res => res.blob())
                .then(blob => {
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
    };

    subcategoryControls() {
        return (
            <div>
                <div className="radio">
                    <Radio label="New SubCategory" checked={this.state.isNewSubCategory} onChange={() => this.setState({ isNewSubCategory: true, subcategoryName: null })
                    } />
                    <Radio label="Existing SubCategory" checked={!this.state.isNewSubCategory} onChange={() => this.setState({ isNewSubCategory: false, subcategoryName: null })} />
                </div>
            </div>
        )
    };

async editControl(data){
    try {
        const { state, callBack } = this.props.location;
        await callBack(data);
        this.props.history.goBack();
    } catch (error) {
        
    }
}

    handleChange(event, stateVariable) {
        this.setState({ [stateVariable]: event.target.value });
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


    toggleControl() {
        return (
            <div>
            </div>
        )
    }

    categoryFields(optionItems, subItems) {
        const { type } = this.props.location;
        return (
            <div className="input">
                <ul>
                    {(type === 'move' || type === 'copy') &&

                        <li>
                            <label>{this.state.isNewCategory ? 'Category Name' : 'Select from Category'}:</label>
                            {

                                !this.state.isNewCategory ?
                                    <select id="item" name="categoryName" onChange={(e) => this.handleChange(e, 'categoryName')} className="drop-down">
                                        {optionItems}
                                    </select>
                                    :
                                    <input type="text" value={this.state.categoryName || ''} name="categoryName" onChange={(e) => this.handleChange(e, 'categoryName')} />
                            }
                        </li>
                    }
                    {
                        (type === 'subcategory' || type === 'copy') &&
                        <li>
                            <label>{this.state.isNewSubCategory ? 'SubCategory Name' : 'Select from SubCategory'}:</label>
                            {
                                !this.state.isNewSubCategory ?
                                    <select id="item" name="categoryName" onChange={(e) => this.handleChange(e, 'subcategoryName')} className="drop-down">
                                        {subItems}
                                    </select>
                                    :
                                    <input type="text" value={this.state.subcategoryName || ''} name="categoryName" onChange={(e) => this.handleChange(e, 'subcategoryName')} />
                            }
                        </li>
                    }

                </ul>
            </div>
        )
    }

    inputController(optionItems, subItems) {
        const { state, callBack } = this.props.location;
        const { DocId } = state
        const { name, price, active, categoryName, offer, description, image, imageUrl, offerTog, inventory, shippingRate, taxRate, minQty, maxQty } = this.state;

        let offerToint = parseInt(offer);
        let priceToint = parseInt(price)
        if (offerToint > priceToint) {
            alert("please give offer price less than actual price")
        }
        const { type } = this.props.location;
        const readCheck = type === 'copy' || type === 'move' ? true : false
        const checkType = type === 'move' ? true : false;
        return (
            <div className="input">
                <ul>
                    <li>
                        <label>Name:</label>
                        <input type="text" value={name || ''} onChange={(e) => { this.handleChange(e, 'name') }} readOnly={checkType} />
                    </li>
                    <li>
                        <label>Price:</label>
                        <input type="number" value={price || ''} onChange={(e) => { this.handleChange(e, 'price') }} readOnly={checkType} />
                    </li>

                    {
                        (type === 'edit' || type === 'copy') &&
                        <ul>
                            <li>
                                <label>Description:</label>
                                <input type="text" value={description || ''} onChange={(e) => { this.handleChange(e, 'description') }} readOnly={readCheck} />
                            </li>
                            <li>
                                <label>Inventory:</label>
                                <input type="text" value={inventory || ''} onChange={(e) => { this.handleChange(e, 'inventory') }} readOnly={readCheck} />
                            </li>
                            <li>
                                <label>Tax rate:</label>
                                <input type="text" value={taxRate || ''} onChange={(e) => { this.handleChange(e, 'taxRate') }} readOnly={readCheck} />
                            </li>
                            <li>
                                <label>Shipping rate:</label>
                                <input type="text" value={shippingRate || ''} onChange={(e) => { this.handleChange(e, 'shippingRate') }} readOnly={readCheck} />
                            </li>
                            <li>
                                <label>Min Order Qty:</label>
                                <input type="text" value={minQty || ''} onChange={(e) => { this.handleChange(e, 'minQty') }} readOnly={readCheck} />
                            </li>
                            <li>
                                <label>Max Order Qty:</label>
                                <input type="text" value={maxQty || ''} onChange={(e) => { this.handleChange(e, 'maxQty') }} readOnly={readCheck} />
                            </li>
                            <li className="options" onClick={() => this.setState({ active: !this.state.active })}>
                                <AiFillCheckCircle color={this.state.active ? '#0984e3' : '#ccc'} size="1.5rem" />
                                <label style={{ marginBottom: 10 }}>IsActive</label>
                            </li>
                            <li className="options" onClick={() => this.setState({ offerTog: !this.state.offerTog })}>
                                <AiFillCheckCircle color={this.state.offerTog ? '#0984e3' : '#ccc'} size="1.5rem" />
                                <label>IsOffer</label>
                            </li>
                            <li style={{ display: this.state.offerTog ? "inline" : "none" }}>
                                <label>Offer Price:</label>
                                <input type="number" value={this.state.offer || ''} onChange={(e) => { this.handleChange(e, 'offer') }} readOnly={readCheck} />
                            </li>
                        </ul>
                    }
                </ul>
            </div>
        )
    }



    render() {
        const { state, callBack } = this.props.location;
        const { DocId } = state
        const { name, price, active, categoryName, offer, description, image, imageUrl, offerTog, inventory, shippingRate, taxRate, minQty, maxQty } = this.state;

        const fileUrl = imageUrl ? imageUrl : image
        let offerToint = parseInt(offer);

        const data = {
            name, price, categoryName, offerToint, description, DocId, active, fileUrl, offerTog, shippingRate
        }
        let catList = this.state.categories;
        let subList = this.state.subCategories;
        let optionItems = catList.map((catList, index) =>
            <option key={catList}>{catList}</option>
        );
        let subItems = subList.map((subList) =>
            <option key={subList}>{subList}</option>
        );
        const { type } = this.props.location;
        return (
            <div className="edit-container">
                <div className="sub-header"><RiArrowGoBackLine onClick={this.props.history.goBack} className="icon" size="22px" /><label>Edit Product</label></div>
                <div className="elements">
                    {this.inputController(optionItems, subItems)}
                    {(type === 'move' || type === 'copy') &&
                        this.categoryControls()}
                    {(type === 'subcategory' || type === 'copy') &&
                        this.subcategoryControls()}
                    {this.categoryFields(optionItems, subItems)}
                    {(type === 'edit' || type === 'copy') &&
                        this.uploadImage()}
                    <div className="input">
                        <ul>
                            <li><button className="primary" onClick={() => this.editControl(data)}>Save</button></li>
                        </ul>
                    </div></div>
            </div>
        )
    }
}
