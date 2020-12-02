import React from 'react'
import './addProduct.style.scss'
export const Listview = (props) => {
    const { data, edit } = props;
   const menuControl=()=>{
        return(
           <div>
            <button type="menu" menu="popup-menu">
              Dropdown
            </button>
            
            <menu type="context" id="popup-menu">
              <menuitem>Action</menuitem>
              <menuitem>Another action</menuitem>
              <hr/>
              <menuitem>Separated action</menuitem>
            </menu>

            </div>        )
    }
    return (
        <div className="listContainer">
        <div className="listView" >
            <div>
            <img src={data.Imageurl} alt="image" className="thumbnailImg" />
            </div>
            <div>
                <pre>
            <text >Product Name : {data.ProductName}</text><br/>
                <text  >Category :{data.Category}</text><br />
                <text >RetailPrice  : {data.RetailPrice}</text><br />
                </pre>
            </div>
        </div>
        <div style={{marginLeft:80}}>
            <button className="button"  onClick={() => props.nav.push({ pathname: 'editScreen', state: data, callBack: edit,type:'edit' })}>Edit</button>
            <button className="button"  onClick={() => props.delete(data.DocId)}>Delete</button>
            <button className="button"  onClick={() => props.nav.push({ pathname: 'editScreen', state: data, callBack: edit,type:'move' })}>Move category</button>
            <button className="button"  onClick={() => props.nav.push({ pathname: 'editScreen', state: data, callBack: edit,type:'copy' })}>Copy</button>
            </div>
        </div>
    )
}