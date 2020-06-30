import React from 'react';
import Backdrop from '../Backdrop';

import StyledModal from './styles';

const Modal = React.memo(
	props => {
		return (
			<>
				<Backdrop show={props.show} clicked={props.modalClosed} />
				<StyledModal
					className={props.show ? 'purchase-true' : 'purchase-false'}
				>
					<div className='title'>
						<p>{props.title}</p>
					</div>
					<div className='content'>{props.children}</div>
				</StyledModal>
			</>
		);
	},
	(prevProps, currentProps) =>
		prevProps.show === currentProps.show &&
		prevProps.children === currentProps.children
);

export default Modal;
