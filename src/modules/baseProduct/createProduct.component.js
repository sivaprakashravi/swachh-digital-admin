import React from 'react';
import './createProduct.style.scss';
import register from '../../services/fetchsvc.service';

class CreateProduct extends React.Component {
    fileObj = [];
    fileArray = []
    constructor(props) {
        super(props);
        this.state = {
            imgs: [],
            imageUrl: null,
            file: null,
            image: null,
            categories: []
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    async getCategories() {
        const store = await localStorage.getItem('storeUser');
        const { StoreId } = JSON.parse(store)
        const dataId = await localStorage.getItem('userToken');
        const { email, localId, idToken } = JSON.parse(dataId);
        const category = await register.get(`api/getCategories/${StoreId}`, idToken);
        this.setState({ categories: category.Category })
    }

    componentDidMount() {
        this.getCategories();
        console.log("image", this.state.image)
    }

    async CreateProductControl() {
        const { imageUrl, productName, price, categoryName } = this.state
        await this.setState({ id: productName.substring(0, 3) + this.randomString(3, '0123456789') });
        const store = await localStorage.getItem('storeUser');
        const dataId = await localStorage.getItem('userToken');
        const { email, localId, idToken } = JSON.parse(dataId);
        const { StoreId } = JSON.parse(store);
        const { ImageUrl } = JSON.parse(this.state.imageUrl);
        try {
            const data = {
                "Brands": "",
                "Category": categoryName,
                "SubCategory": "",
                "ImageUrl": ImageUrl,
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

            const productId = await register.post('api/checkProductCode', JSON.stringify(proId), idToken);
            const len = Object.keys(productId).length; // 2
            if (len < 1) {
                const create = await register.post('api/createProduct', JSON.stringify(data), idToken);
                alert(create.message);
                this.props.history.push('dashboard')
            } else {
                this.CreateProductControl()
            }
        } catch (error) {
            console.log("create product error", error)
        }
    }

    //generate random value
    randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i)
            result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }


    categoryControls(optionItems) {
        return (
            <div>
                <div className="radio">
                    <form>
                        <input type="radio" id="new" name="category" value="New Category" onChange={this.handleChange} />
                        <label for="new" >New Category</label>
                        <input type="radio" id="exist" name="category" value="Existing Category" onChange={this.handleChange} />
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
                                    {optionItems}
                                </select>
                            </ul>
                            :
                            <div className="input">
                                <ul>
                                    <li>
                                        <label>Category Name :</label>
                                        <input type="text" value={this.state.categoryName} name="categoryName" onChange={this.handleChange} />
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
                console.log(result)
                this.setState({ imageUrl: result });
                alert("Image Uploaded")
            })
            .catch(error => console.log('error', error));
        // const data = await register.uploadImage('uploadFile',formData);
        //    this.setState({imageUrl:data}) 
    }
    onFileChange = event => {

        // Update the state 
        this.setState({ file: event.target.files[0] });

    };
    uploadImage() {
        console.log(this.state.image)
        return (
            <div>
                <div className="inputView">
                    <input type="file" id="browser" multiple={true}
                        accept="image/*"
                        onChange={(e) => this.uploadMultipleFiles(e)}
                    />
                    <div>
                        <button onClick={() => this.uploadControl()} className="primary" disabled={!this.state.image} >
                            Upload!
                </button>
                    </div>
                </div>
                {this.state.file ? <img src={this.state.image} alt="product" className="productImg" /> : null}
            </div>
        )
    }

    productNameControls() {
        return (
            <div className="input">
                <ul>
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
                <button className="primary" disabled={!(this.state.productName && this.state.price && this.state.categoryName )} onClick={() => this.CreateProductControl()}>SAVE</button>
            </div>
        )
    }

    controls(optionItems) {
        return (
            <div className="controls">
                {this.categoryControls(optionItems)}
                {this.productNameControls()}
            </div>)
    }

    render() {
        let planets = this.state.categories;
        let optionItems = planets.map((planet) =>
            <option key={planet}>{planet}</option>
        );
        return (
            <div className="createProduct">
                <h3>Enter Product Details</h3>
                {this.controls(optionItems)}
            </div>
        )
    }
}

export default CreateProduct;