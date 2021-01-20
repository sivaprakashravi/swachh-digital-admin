import React from 'react';
import './customers.styles.scss';
import { BiRupee } from 'react-icons/bi';
import { BsImages } from 'react-icons/bs';
export const Listview = (props) => {
  const { data, edit } = props;

  const tile = (data) => {
    return (
      <div className="tile">
        {data.Imageurl ? <div className="image-box" style={{ backgroundImage: `url(${data.Imageurl})` }}></div> : <div className="image-box"><BsImages size="25px" className="placeholder" /></div>}
        <div className="elements">
          <div>Name: {data.name}</div>
          <div>email: {data.email}</div>
          <div >Phone: {data.number}</div>
        </div>
      </div>
    )
  }
  return (
    <div className="customer">{tile(data)}</div>
  )
}