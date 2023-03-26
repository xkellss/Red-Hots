import React, {useContext} from "react";

import CartList from "../components/menu/CartList";

function CartPage(){

    return(
        <section>
            <h1>My Orders</h1>
            <CartList/>
        </section>
    )
}export default CartPage;