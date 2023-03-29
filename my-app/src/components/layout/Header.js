import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import classes from './Header.module.css'
import CartContext from "../../store/Cart-Context";

function Header() {
    const cartCtx = useContext(CartContext)

    return (
        <nav className={classes.navbar}>
            <ul>
                <li>
                    <Link to={'/'}>Online Ordering</Link>
                </li>
                <li>
                    <Link to={'/cart'}>
                        Cart
                        <span className={classes.badge}> {cartCtx.totalCart}</span>

                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Header;