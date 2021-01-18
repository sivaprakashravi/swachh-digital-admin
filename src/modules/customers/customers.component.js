// import React from 'react';
// import { Listview } from './customer_list.component';
// import { RiArrowGoBackLine } from 'react-icons/ri';
// import { BsSearch } from 'react-icons/bs';
// import { IoMdClose } from "react-icons/io";
// import './customers.styles.scss'
// export class CustomerScreen extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             list: [
//                 {
//                     name:'sai',
//                     email:'sai@gmail.com',
//                     number:7981193171
//                 },
//                 {
//                     name:'shanu',
//                     email:'shanu@gmail.com',
//                     number:8790900737
//                 }
//             ],
//             isSearch: false,
//             searchText: ''
//         }
        
//     }

    
//     noList() {
//         return (<div className="no-list"><label>No Products Found</label><button className="primary" onClick={() => {
//             this.props.history.push('CreateProduct');
//         }}>Add a Product</button></div>)
//     }
//     render() {
//         let list = this.state.list && this.state.list.length ? this.state.list.map((x, index) => {
//             return (
//                 <Listview data={x} key={index}/>
//             )
//         }) : this.noList();
//         const { state } = this.props.location;
//         return (
//             <div className="products">
//                 {this.state.list && this.state.list.length ? <div className="sub-header"><RiArrowGoBackLine onClick={this.props.history.goBack} className="icon" size="22px" />
//                     {this.state.isSearch ? <input type="text" value={this.state.searchText} placeholder="Search..." /> : <label>{state === 'OFFERS' ? 'Oeders List' : 'Products List'}</label>}
//                     {this.state.isSearch ? <IoMdClose className="search" size="22px" onClick={() => this.setState({ isSearch: false, searchText: '' })} /> : <BsSearch className="search" size="22px" onClick={() => this.setState({ isSearch: true, searchText: '' })} />}
//                 </div> : null}
//                 {list}
//             </div>
//         )
//     }
// }
