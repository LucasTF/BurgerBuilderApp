import React from 'react';

import './Button.css';

const Button = props => {
    return (
        <button className={props.type} disabled={props.disabled} onClick={props.click}>
            {props.children}
        </button>
    );
}

export default Button;