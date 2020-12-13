import React from 'react'
import './productList.style.scss'
import {VMenu} from '../../components/menu.component'
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
            <VMenu onSelect={()=>onclickMenu} data={data} >
            <li
          onClick={() =>  props.nav.push({ pathname: 'editScreen', state: data, callBack: edit,type:'edit' })}
        >
          Edit
        </li>
        <li onClick={() => props.delete(data.DocId)}>Delete</li>
        <li onClick={() => props.nav.push({ pathname: 'editScreen', state: data, callBack: edit,type:'move' })}>Move</li>
        <li onClick={() => props.nav.push({ pathname: 'editScreen', state: data, callBack: edit,type:'copy' })}>Copy</li>
        <li onClick={() => props.nav.push({ pathname: 'editScreen', state: data, callBack: edit,type:'subCategroy' })}>Add subcategory</li>

                </VMenu><br/>
                <text  >Category :{data.Category}</text><br />
                <text >RetailPrice  : {data.RetailPrice}</text><br />
                </pre>
            </div>
        </div>
          {/* <div style={{marginLeft:80}}>
            <button className="button"  onClick={() => {}}>Accept</button>
            <button className="button"  onClick={() => {}}>Reject</button>
            </div>   */}
        </div>
    )
}