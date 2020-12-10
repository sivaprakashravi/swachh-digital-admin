import React from 'react'
import './addProduct.style.scss'
import register from "../../services/fetchsvc.service";
import Switch from "react-switch";
import Radio from '../../components/radio.component'
export class EditScreen extends React.Component {
    fileObj = [];
    fileArray = []
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            subCategories: [],
            image: null,
            file: null,
            active: true,
            offerTog: false,
            isNewCategory: true,
            isNewSubCategory: true
        }
        this.handleChangeTogActive = this.handleChangeTogActive.bind(this);
        this.handleChangeTogOffer = this.handleChangeTogOffer.bind(this);
    }

    handleChangeTogActive(active) {

        this.setState({ active });
    }
    handleChangeTogOffer(offerTog) {

        this.setState({ offerTog });
    }
    async getCategories() {
        const store = await localStorage.getItem('storeUser');
        const { StoreId } = JSON.parse(store)
        const dataId = await localStorage.getItem('userToken');
        const { email, localId, idToken } = JSON.parse(dataId);
        const category = await register.get(`api/getCategories/${StoreId}`, idToken);
        this.setState({ categories: category.Category, subCategories: category.SubCategory })
    }

    componentDidMount() {
        const { ProductName, RetailPrice, Category, ProductDesc, Offer_Price, Imageurl } = this.props.location.state;
        const { type } = this.props.location
        {
            type === 'copy' ?
                this.setState({ description: ProductDesc, offer: Offer_Price, })
                :
                this.setState({ name: ProductName, price: RetailPrice, categoryName: Category, description: ProductDesc, offer: Offer_Price, image: Imageurl })
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
                this.setState({ imageUrl: result })
            })
            .catch(error => console.log('error', error));
        // const data = await register.uploadImage('uploadFile',formData);
        //    this.setState({imageUrl:data}) 
    }


    categoryControls() {
        return (
            <div>
                <div className="radio">
                    <Radio label="New Category" checked={this.state.isNewCategory} onChange={() => this.setState({ isNewCategory: true, categoryName: null })
                    } />
                    <Radio label="Existing Category" checked={!this.state.isNewCategory} onChange={() => this.setState({ isNewCategory: false, categoryName: null })} />
                </div>
                {this.subCategoryControls()}
            </div>
        )
    }

    subCategoryControls() {
        return (
            <div>
                <div className="radio">
                    <Radio label="New SubCategory" checked={this.state.isNewSubCategory} onChange={() => this.setState({ isNewSubCategory: true, subcategoryName: null })
                    } />
                    <Radio label="Existing SubCategory" checked={!this.state.isNewSubCategory} onChange={() => this.setState({ isNewSubCategory: false, subcategoryName: null })} />
                </div>
            </div>
        )
    }


    handleChange(event, stateVariable) {
        this.setState({ [stateVariable]: event.target.value });
    }
    uploadImage() {
        return (
            <div >
                <div className="inputView">
                    <input type="file" id="browser" multiple={true}
                        accept="image/*"
                        onChange={(e) => this.uploadMultipleFiles(e)}
                    />
                    <div className="input">
                        <button onClick={() => this.uploadControl()} className="primary" disabled={!this.state.image}>
                            Upload!
                    </button>
                    </div>
                </div>
                {this.state.image ? <img src={this.state.image} alt="product" className="productImg" /> : null}
            </div>
        )
    }

    toggleControl() {
        const { type } = this.props.location;
        const readCheck = type === 'copy' || type === 'move' ? true : false
        return (
            <div >
                <label for="active" style={{ marginBottom: 10 }}>IsActive</label>
                <Switch onChange={this.handleChangeTogActive} checked={this.state.active} id="active" />

                <label for="offer" style={{ marginLeft: 60 }}>IsOffer</label>
                <Switch onChange={this.handleChangeTogOffer} checked={this.state.offerTog} id="offer" />
                <div className="input">
                    <ul>
                        <li style={{ display: this.state.offerTog ? "inline" : "none" }}>
                            <label>Offer Price:</label>
                            <input type="number" value={this.state.offer} onChange={(e) => { this.handleChange(e, 'offer') }} readOnly={readCheck} />
                        </li>

                    </ul>
                </div>
            </div>
        )
    }


    inputController(optionItems, subItems) {
        const { state, callBack } = this.props.location;
        const { DocId } = state
        const { name, price, active, category, offer, description, image, imageUrl, offerTog, inventory, shippingRate, taxRate, minQty, maxQty } = this.state;

        let offerToint = parseInt(offer);
        let priceToint = parseInt(price)
        if (offerToint > priceToint) {
            alert("please give offer price less than actual price")
        }
        const { type } = this.props.location;
        const readCheck = type === 'copy' || type === 'move' ? true : false
        const checkType = type === 'move' ? true : false
        return (
            <div className="input">
                <ul>
                    <li>
                        <label>{this.state.isNewCategory ? 'Category Name' : 'Select from Category'}:</label>
                        {
                            !this.state.isNewCategory ?
                                <select id="item" name="categoryName" onChange={(e) => this.handleChange(e, 'categoryName')} className="dropDown">
                                    <option>Choose one</option>
                                    {optionItems}
                                </select>
                                :
                                <input type="text" value={this.state.categoryName} name="categoryName" onChange={(e) => this.handleChange(e, 'categoryName')} />
                        }
                    </li>
                    <li>
                        <label>{this.state.isNewSubCategory ? 'SubCategory Name' : 'Select from SubCategory'}:</label>
                        {
                            !this.state.isNewSubCategory ?
                                <select id="item" name="categoryName" onChange={(e) => this.handleChange(e, 'subcategoryName')} className="dropDown">
                                    <option>Choose one</option>
                                    {subItems}
                                </select>
                                :
                                <input type="text" value={this.state.subcategoryName} name="categoryName" onChange={(e) => this.handleChange(e, 'subcategoryName')} />
                        }
                    </li>
                    <li>
                        <label>Product Name:</label>
                        <input type="text" value={name} onChange={(e) => { this.handleChange(e, 'name') }} readOnly={checkType} />
                    </li>
                    <li>
                        <label>Price:</label>
                        <input type="number" value={price} onChange={(e) => { this.handleChange(e, 'price') }} readOnly={checkType} />
                    </li>

                    <li>
                        <label>Product Description:</label>
                        <input type="text" value={description} onChange={(e) => { this.handleChange(e, 'description') }} readOnly={readCheck} />
                    </li>
                    <li>
                        <label>Inventory:</label>
                        <input type="text" value={inventory} onChange={(e) => { this.handleChange(e, 'inventory') }} readOnly={readCheck} />
                    </li>
                    <li>
                        <label>Tax rate:</label>
                        <input type="text" value={taxRate} onChange={(e) => { this.handleChange(e, 'taxRate') }} readOnly={readCheck} />
                    </li>
                    <li>
                        <label>shipping rate:</label>
                        <input type="text" value={shippingRate} onChange={(e) => { this.handleChange(e, 'shippingRate') }} readOnly={readCheck} />
                    </li>
                    <li>
                        <label>Min Order Qty:</label>
                        <input type="text" value={minQty} onChange={(e) => { this.handleChange(e, 'minQty') }} readOnly={readCheck} />
                    </li>
                    <li>
                        <label>Max Order Qty:</label>
                        <input type="text" value={maxQty} onChange={(e) => { this.handleChange(e, 'maxQty') }} readOnly={readCheck} />
                    </li>
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
            name, price, categoryName, offerToint, description, DocId, active, fileUrl, offerTog
        }
        let catList = this.state.categories;
        let subList = this.state.subCategories;
        let optionItems = catList.map((catList) =>
            <option key={catList}>{catList}</option>
        );
        let subItems = subList.map((subList) =>
            <option key={subList}>{subList}</option>
        );
        return (
            <div className="editContainer">
                {this.categoryControls()}
                {this.inputController(optionItems, subItems)}
                {this.toggleControl()}
                {this.uploadImage()}
                <div className="input">
                    <ul>
                        <li><button className="primary" onClick={() => callBack(data)}>Save</button></li>
                    </ul>
                </div>
            </div>
        )
    }
}