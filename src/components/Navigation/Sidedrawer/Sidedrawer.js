import React from 'react';

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';

import './Sidedrawer.css';

const Sidedrawer = props => {

    let sidedrawer = props.open ? "sidedrawer open" : "sidedrawer close";

    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={sidedrawer}>
                <Logo title="BurgerBuilder"/>
                <nav>
                    <NavItems page="builder" />
                </nav>
            </div>
        </Auxiliary>
    );
}

export default Sidedrawer;