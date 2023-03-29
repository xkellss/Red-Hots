import React, {useContext} from "react";
import MenuList from "../components/menu/MenuList";
import CartContext from "../store/Cart-Context";

function CartPage(){

    const cartCtx = useContext(CartContext);

    let content;

    if (cartCtx.totalCart ===0){
        content= <p>You got nothing in your order. Start adding some?</p>
    }else {
        content = <MenuList menuItems ={cartCtx.cart} />

    }

    return(
        <section>
            <h1>My Orders</h1>
            {content}
        </section>
    )
}export default CartPage;