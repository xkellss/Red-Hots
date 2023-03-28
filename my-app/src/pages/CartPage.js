import React, {useContext} from "react";
import classes from "./CartPage.module.css";

import CartList from "../components/menu/CartList";

function CartPage(){

    return(
        <section>
            <h1>My Orders</h1>
            <CartList/>
            {/*<button className={classes.checkout}>Checkout</button>*/}

        </section>
    )
}export default CartPage;