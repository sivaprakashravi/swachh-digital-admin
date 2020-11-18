import React from 'react'
import './addProduct.style.scss'

const ItemScreen=(props)=>{
    const {data} = props
    return(
            <div className="rowView" >
            <div >
<img src={data} alt="product" width="100" height="100" />
            </div>
            <input type="text" placeholder="Product Name" /><br/>
            <input type="text" placeholder="price" /><br/>
        </div>
   
    )
}

export default ItemScreen;