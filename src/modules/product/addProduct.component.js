import React from 'react'
import './addProduct.style.scss'
import ItemScreen from './productItem.component'

function AddProductScreen(props){
   const {image} = props.location.state
     let list = image.map((x,index)=>
    { return(
<ItemScreen data={x} key={index}/>
     )}
 );
    return(
        <div style={{margin:10}}>
            {list}
            <button className="primary">SAVE</button>
        </div>
    )
}

export default AddProductScreen;