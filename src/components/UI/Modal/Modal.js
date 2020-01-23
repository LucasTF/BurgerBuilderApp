import React, {Component, Fragment} from 'react';
import Backdrop from '../Backdrop/Backdrop';

import './Modal.css';


class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show;
    }

    render(){
        let style = this.props.show ? "modal purchase-true" : "modal purchase-false";
        return (
            <Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={style}>
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}

export default Modal;