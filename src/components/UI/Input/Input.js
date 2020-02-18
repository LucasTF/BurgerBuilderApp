import React from 'react';

import './Input.css';

const Input = props => {
    let element = null;
    let invalidMessage = null;
    const inputStyle = ['input-element'];

    if (props.touched && props.shouldValidate && props.invalid) {
        inputStyle.push('invalid');
        invalidMessage = <p className='invalid'>{props.invalidMessage}</p>;
    }

    switch (props.elementType) {
        case 'input':
            element = (
                <input
                    className={inputStyle.join(' ')}
                    type={props.type}
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                />
            );
            break;
        case 'textarea':
            element = (
                <textarea
                    className={inputStyle.join(' ')}
                    type={props.type}
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                />
            );
            break;
        default:
            element = (
                <input
                    className={inputStyle.join(' ')}
                    type={props.type}
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                />
            );
    }

    return (
        <div className='input'>
            <label className='label'>{props.label}</label>
            {element}
            {invalidMessage}
        </div>
    );
};

export default Input;
