import React from 'react';
import Backdrop from '../Backdrop';

import './Modal.css';

const Modal = React.memo(
	props => {
		let style = props.show ? 'modal purchase-true' : 'modal purchase-false';
		return (
			<>
				<Backdrop show={props.show} clicked={props.modalClosed} />
				<div className={style}>{props.children}</div>
			</>
		);
	},
	(prevProps, currentProps) =>
		prevProps.show === currentProps.show ||
		prevProps.children === currentProps.children
);

export default Modal;
