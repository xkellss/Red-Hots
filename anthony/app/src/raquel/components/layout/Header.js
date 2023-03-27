import React from 'react';
import {Link} from "react-router-dom";
import classes from './Header.module.css'

function Header() {
    return (
            <nav className={classes.navbar}>
                <ul>
                    <li>
                        <Link to={'/'}>Online Ordering</Link>
                    </li>
                    <li>
                        <Link to={'/'}>Cart</Link>
                    </li>
                </ul>
            </nav>
    );
}

export default Header;