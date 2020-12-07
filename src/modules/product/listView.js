import React from 'react'
import './addProduct.style.scss'
import {VMenu} from '../../components/menu'
export const Listview = (props) => {
    const { data, edit } = props;
  const  onclickMenu=()=>{
       console.log("V")
   }
    return (
        <div className="listContainer">
        <div className="listView" >
            <div>
            <img src={data.Imageurl} alt="" className="thumbnailImg" />
            </div>
            <div >
                <pre>
            <text >Product Name : {data.ProductName}</text>
            <VMenu onSelect={()=>onclickMenu} data={data} /><br/>
                <text  >Category :{data.Category}</text><br />
                <text >RetailPrice  : {data.RetailPrice}</text><br />
                </pre>
            </div>
        </div>
        {/* <div style={{marginLeft:80}}>
            <button className="button"  onClick={() => props.nav.push({ pathname: 'editScreen', state: data, callBack: edit,type:'edit' })}>Edit</button>
            <button className="button"  onClick={() => props.delete(data.DocId)}>Delete</button>
            <button className="button"  onClick={() => props.nav.push({ pathname: 'editScreen', state: data, callBack: edit,type:'move' })}>Move category</button>
            <button className="button"  onClick={() => props.nav.push({ pathname: 'editScreen', state: data, callBack: edit,type:'copy' })}>Copy</button>
            </div> */}
        </div>
    )
}