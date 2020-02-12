import React from 'react'

import './Input.css';

const Input = props => {

    let element = null;

    switch(props.elementType) {
        case('input'):
            element = <input className='input-element' {...props} />
            break;
        case('textarea'):
            element = <textarea className='input-element' {...props} />
            break;
        default:
            element = <input className='input-element' {...props} />;
    }

    return(
        <div className='input' >
            <label className='label' >{props.label}</label>
            {element}
        </div>
    );
}

export default Input;