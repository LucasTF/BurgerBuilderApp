import React from 'react';
import {NavLink} from 'react-router-dom';

import './NavItems.css';

const NavItems = (props) => {
    return (
        <ul className="nav-items">
            <li className="nav-item">
                <NavLink to='/' >Builder</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/checkout'>Checkout</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/contact'>Contact</NavLink>
            </li>
        </ul>
    );
}

export default NavItems;