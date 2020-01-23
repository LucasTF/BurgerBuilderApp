import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

import './Modal.css';


const Modal = props => {
    let style = props.show ? "modal purchase-true" : "modal purchase-false";
    return (
        <Auxiliary>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={style}>
                {props.children}
            </div>
        </Auxiliary>
    );
}

export default Modal;