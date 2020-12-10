import React, { Component } from 'react';
import './loader.style.scss'
import { AiOutlineLoading } from "react-icons/ai";
class Loader extends Component {
    static defaultProps = {
        size: '22px',
        color: '#3f51b5'
    };
    render() {
        return (
            <div className="loading">
                <div>
                    <AiOutlineLoading size="50px" className="spinner" />
                </div>
            </div>
        );
    }
}

export default Loader;
