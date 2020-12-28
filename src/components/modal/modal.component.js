import React from 'react';
import './modal.style.scss';

const Modalview =({children})=> {
    let modal = document.getElementById("myModal");
        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
                <span className="close" onClick={()=>modal.style.display = "none"}>&times;</span>
                <div className="children">
                    {children}
                    </div>
                </div>
            </div>
        )
};

export default Modalview;