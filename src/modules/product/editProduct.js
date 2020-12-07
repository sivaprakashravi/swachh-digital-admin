import React from 'react';
import './addProduct.style.scss';
import register from "../../services/fetchsvc";
import Switch from "react-switch";
export class EditScreen extends React.Component {
    fileObj = [];
    fileArray = []
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            image: null,
            file: null,
            active: true,
            offerTog: false
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
        this.setState({ categories: category.Category });
    }

    componentDidMount() {
        const { ProductName, RetailPrice, Category, ProductDesc, Offer_Price, Imageurl } = this.props.location.state;
        this.setState({ name: ProductName, price: RetailPrice, category: Category, description: ProductDesc, offer: Offer_Price, image: Imageurl });
        this.getCategories();
    }

    async uploadMultipleFiles(e) {
        try {
            this.setState({ file: e.target.files[0] });
            await this.fileObj.push(e.target.files);
            for (let i = 0; i < this.fileObj[0].length; i++) {
                this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
            }
            await this.setState({ image: this.fileArray });
        } catch (error) {
            console.log("image error", error);
        }
    }

    async uploadControl() {
        console.log(this.state.image);
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
                console.log(result)
                this.setState({ imageUrl: result })
            })
            .catch(error => console.log('error', error));
        // const data = await register.uploadImage('uploadFile',formData);
        //    this.setState({imageUrl:data}) 
    }

    categoryControls(optionItems) {
        return (
            <div className="categoryContainer">
                <div className="radio">
                    <form>
                        <input type="radio" id="new" name="category" value="New Category" onChange={(e) => this.handleChange(e, 'category')} />
                        <label for="new" >New Category</label>
                        <input type="radio" id="exist" name="category" value="Existing Category" onChange={(e) => this.handleChange(e, 'category')} />
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
                                <select id="item" name="categoryName" onChange={(e) => this.handleChange(e, 'category')} className="dropDown">
                                    {optionItems}
                                </select>
                            </ul>
                            :
                            <div className="input">
                                <ul>
                                    <li>
                                        <label>Category Name :</label>
                                        <input type="text" value={this.state.category} name="categoryName" onChange={(e) => this.handleChange(e, 'category')} />
                                    </li>
                                </ul>
                            </div>
                    }
                </div>
            </div>
        )
    }


    handleChange(event, stateVariable) {
        this.setState({ [stateVariable]: event.target.value });
    };
    uploadImage() {
        return (
            <div >
                <div className="inputView">
                    <input type="file" id="browser" multiple={true}
                        accept="image/*"
                        onChange={(e) => this.uploadMultipleFiles(e)}
                    />
                    <div>
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
        return (
            <div >

                <label for="active">IsActive</label>
                <Switch onChange={this.handleChangeTogActive} checked={this.state.active} id="active" />

                <label for="offer">IsOffer</label>
                <Switch onChange={this.handleChangeTogOffer} checked={this.state.offerTog} id="offer" />
                <ul>
                    <li style={{ display: this.state.offerTog ? "inline" : "none" }}>
                        <label>Offer Price:</label>
                        <input type="number" value={this.state.offer} onChange={(e) => { this.handleChange(e, 'offer') }} />
                    </li>

                </ul>
            </div>
        )
    }

    render() {
        const { state, callBack } = this.props.location;
        const { DocId } = state
        const { name, price, active, category, offer, description, image, imageUrl, offerTog } = this.state;
        const fileUrl = imageUrl ? imageUrl : image
        let offerToint = parseInt(offer);
        let priceToint = parseInt(price)
        const data = {
            name, price, category, offerToint, description, DocId, active, fileUrl, offerTog
        }
        let planets = this.state.categories;
        let optionItems = planets.map((planet) =>
            <option key={planet}>{planet}</option>
        );

        if (offerToint > priceToint) {
            alert("please give offer price less than actual price")
        }
        return (
            <div className="editContainer">
                {this.categoryControls(optionItems)}
                <div className="input">
                    <ul>
                        <li>
                            <label>Product Name:</label>
                            <input type="text" value={name} onChange={(e) => { this.handleChange(e, 'name') }} />
                        </li>
                        <li>
                            <label>Price:</label>
                            <input type="number" value={price} onChange={(e) => { this.handleChange(e, 'price') }} />
                        </li>

                        <li>
                            <label>Product Description:</label>
                            <input type="text" value={description} onChange={(e) => { this.handleChange(e, 'description') }} />
                        </li>
                        {this.toggleControl()}
                        {this.uploadImage()}
                        <li><button className="primary" onClick={() => callBack(data)}>Save</button></li>
                    </ul>
                </div>
            </div>
        )
    }
}