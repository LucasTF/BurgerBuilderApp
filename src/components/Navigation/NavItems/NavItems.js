import React from 'react';
import {NavLink} from 'react-router-dom';

import './NavItems.css';

const NavItems = () => {
    return (
        <ul className="nav-items">
            <li className="nav-item">
                <NavLink exact to='/' >Builder</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/contact'>Contact</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/orders'>My Orders</NavLink>
            </li>
        </ul>
    );
}

export default NavItems;