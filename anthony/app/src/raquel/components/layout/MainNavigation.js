import React from 'react';
import {Link} from "react-router-dom";
import classes from './MainNavigation.module.css'
import myImage from './logo.png';

function MainNavigation() {
    return (
        <header className={classes.header}>
            <img className={classes.logo} src={myImage} alt="My Image" />
        </header>
    );
}

export default MainNavigation;