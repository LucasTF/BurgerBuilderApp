import React from 'react';

import './NavItems.css';

const NavItems = (props) => {
    return (
        <ul className="nav-items">
            <li className="nav-item">
                <a className={props.page === "builder" ? "active" : null} href="/">Builder</a>
            </li>
            <li className="nav-item">
                <a className={props.page === "checkout" ? "active" : null} href="/">Checkout</a>
                </li>
            <li className="nav-item">
                <a className={props.page === "contact" ? "active" : null} href="/">Contact</a>
            </li>
        </ul>
    );
}

export default NavItems;