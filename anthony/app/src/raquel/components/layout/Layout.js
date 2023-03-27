import React from 'react';
import classes from './Layout.module.css'
import MainNavigation from "./MainNavigation";
import Header from "./Header";

function Layout(props) {
    return (
        <div>
            <MainNavigation/>
            <Header/>
            <main className={classes.main}>
                {props.children}
            </main>
        </div>
    );
}

export default Layout;